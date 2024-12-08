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
    phone,
    jobTitle,
    companyName,
    skills,
    achievements,
    interest,
    jobDescription,
  } = req.body;

  const coverLetterPrompt = `
    Write a professional cover letter using the following details:

    - Full Name: ${fullName}
    - Email: ${email}
    - Phone: ${phone}
    - Job Title: ${jobTitle}
    - Company Name: ${companyName}
    - Skills: ${skills}
    - Achievements: ${achievements}
    - Why Interested in Role: ${interest}
    - Job Description: ${jobDescription || "N/A"}

    The letter should be formal, tailored to the job, and highlight the skills and achievements.
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
