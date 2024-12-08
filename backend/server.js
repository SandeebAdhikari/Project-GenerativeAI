const express = require("express");
const { OpenAI } = require("openai");

const puppeteer = require("puppeteer");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const generateText = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate text");
  }
};

const generatePDF = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  console.log("HTML Content:", html);
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  console.log("PDF Buffer Length:", pdfBuffer.length);
  await browser.close();
  return pdfBuffer;
};

app.post("/generate-cover-letter", async (req, res) => {
  const {
    fullName,
    email,
    address,
    state,
    zipCode,
    phone,
    jobTitle,
    companyName,
    skills,
    achievements,
    jobDescription,
  } = req.body;

  const coverLetterPrompt = `

    Write a professional cover letter using the following details. The sample cover letter have square brackets ([]) for placeholders that 
    should be filled with the provided details but do not include square bracket remove it.:

    Details provided:
    - Full Name: ${fullName}
    - Email: ${email}
    - Address: ${address}
    - State: ${state}
    - ZIP Code: ${zipCode}
    - Phone: ${phone}
    - Job Title: ${jobTitle}
    - Company Name: ${companyName}
    - Skills: ${skills}
    - Achievements: ${achievements}
    - Job Description: ${jobDescription}

    ${address} -> This have city name of the user.
    ${jobDescription} -> This have the job company city,state and zip code.
 
    
    [Full Name]
    [Your Address]
    [Your City, State, ZIP Code]
    [Email]
    [Phone]
    [Date]--> This should be the current date. ->format: MM/DD/YYYY

    [Company Name]
    [Company Address]
    [City, State, ZIP Code]

    Dear Hiring Manager's,

    I am excited to apply for the [Software Engineer] position at [Company Name]. With a strong background in [JavaScript, Python, and cloud-based systems development] and a proven track record of delivering innovative solutions, I am confident in my ability to contribute to the success of your team.

    During my time at [Previous Company or Project Name], I spearheaded the development of [a customer-facing application], reducing user onboarding time by 30% and enhancing overall system performance. My expertise in [React.js] and [Node.js], combined with experience in [AWS deployment], enabled me to deliver scalable and efficient solutions that met client needs. Additionally, collaborating with cross-functional teams has refined my ability to communicate technical concepts to stakeholders, ensuring alignment and transparency in project goals.

    What excites me most about [Company Name] is your commitment to [innovation in artificial intelligence or other relevant value about the company]. The opportunity to work on projects that [align with my passion for problem-solving and creating impactful user experiences] resonates deeply with me. I am eager to leverage my skills to help drive innovation at [Company Name] and contribute to its mission of [relevant company mission/goal].

    I would welcome the chance to discuss how my skills and experiences align with the needs of your team. Please feel free to contact me at [Your Email Address] or [Your Phone Number] to arrange a convenient time to connect.

    Thank you for considering my application. I look forward to the opportunity to contribute to [Company Name]'s success and to grow as a professional within your esteemed organization.

    Warm regards,
    [Your Name]


      `;

  try {
    const generatedText = await generateText(coverLetterPrompt);

    const coverLetterHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Cover Letter</h1>
          <p>${generatedText.replace(/\n/g, "<br>")}</p>
        </body>
      </html>
    `;

    const pdfBuffer = await generatePDF(coverLetterHtml);

    fs.writeFileSync("output.pdf", pdfBuffer);
    console.log("PDF saved to server as output.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cover_letter.pdf"
    );
    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate cover letter");
  }
});

app.post("/generate-resume", async (req, res) => {
  const { summary, experience, education, skills, certifications } = req.body;

  const resumePrompt = `
    Create a professional resume with the following details:

    - Professional Summary: ${summary}
    - Work Experience: ${experience}
    - Education: ${education}
    - Technical Skills: ${skills}
    - Certifications: ${certifications}

    The resume should be well-structured with clear sections for each of the above details.
  `;

  try {
    const resumeText = await generateText(resumePrompt);

    const resumeHtml = `
      <html>
        <head><style>body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }</style></head>
        <body>
          <h1>Resume</h1>
          <p>${resumeText.replace(/\n/g, "<br>")}</p>
        </body>
      </html>
    `;

    const pdfBuffer = await generatePDF(resumeHtml);

    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate resume");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
