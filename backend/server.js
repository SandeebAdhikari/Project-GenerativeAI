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
  const { summary, experience, education, skills, certifications, projects } =
    req.body;

  const resumePrompt = `
    Create a professional resume with the following details and use the provided sample resume as a reference to structure the content. :

    - Professional Summary: ${summary}
    - Work Experience: ${experience}
    - Education: ${education}
    - Technical Skills: ${skills}
    - Certifications: ${certifications}
    - Projects: ${projects} 
    
    All topic are bold, example: "Professional Summary" bolded. All topics sub categories are semi-bolded, example: "Capital One 	New York, NY 
    Full-Stack Developer 	Oct '23 - Present"," Loan Approval Automation System for Capital One" semi-bolded, but not the topic sub categories description are not bolded. Make sure to structure the resume with bolded section headings and semibolded subheadings. Ensure proper formatting for a professional appearance.


    Sample Resume:

    Professional Summary 

    Highly accomplished Full Stack Developer with extensive experience in building end-to-end web applications and enterprise solutions. Expert in Java, Spring Boot, Hibernate, and RESTful APIs for robust backend development, coupled with proficiency in Angular, React, JavaScript, and HTML/CSS for dynamic and responsive frontend design. Adept at developing applications following Microservices Architecture, ensuring scalability and modularity. 
    Extensive experience with relational databases such as MySQL and Oracle, as well as NoSQL databases like MongoDB. Skilled in containerization using Docker, orchestrating deployments with Kubernetes, and implementing CI/CD pipelines with Jenkins. Proficient in using Git for version control, Maven/Gradle for build automation, and Junit and Mockito for unit testing. 
    Well-versed in Agile methodologies and collaborating with cross-functional teams to deliver high-quality, on-time solutions. Strong understanding of Object-Oriented Programming (OOP), Data Structures, and Design Patterns, ensuring efficient and maintainable code. Passionate about leveraging Cloud Platforms like AWS and Azure to design and deploy highly available and secure applications. Seeking to bring technical expertise and innovative solutions to a forward-thinking organization. 

    Work Experience 
    
    Capital One 	New York, NY 
    Full-Stack Developer 	Oct '23 - Present 
    · Architected microservices-based applications using Java, Spring Boot, and Hibernate, ensuring high scalability and modularity. 
    · Developed dynamic and interactive frontend components with React.js, Redux, and Material-UI, enhancing user engagement and interface responsiveness. 
    · Designed and implemented secure RESTful APIs for customer data management, integrating third-party APIs to expand service offerings. 
    · Automated deployment pipelines using Jenkins, and configured Docker containers to streamline development and production environments. 
    · Implemented real-time data processing solutions using Apache Kafka, optimizing transaction handling and event streaming. 
    · Built and maintained cloud infrastructure using AWS, employing Lambda for serverless computing and S3 for secure data storage. 
    · Conducted unit and integration testing with JUnit, Mockito, and Postman, ensuring code quality and system reliability. 
    ·  Enhanced application security by implementing OAuth2, JWT, and Spring Security for authentication and authorization. 
    · Analyzed and optimized application performance with New Relic and Splunk, improving response times and error resolution. 
    · Worked with cross-functional teams using JIRA and Confluence, facilitating effective project tracking and documentation. 
    Technology Used: Java, Spring Boot, Hibernate, React.js, Redux, Material-UI, RESTful APIs, AWS Lambda, S3, Docker, Jenkins, Apache Kafka, OAuth2, JWT, Spring Security, JUnit, Mockito, Postman, New Relic, Splunk, JIRA, Confluence. 

    T-Mobile                                                                                                                                                                              Cary, NC                          
    Full Stack Developer 	Feb '21 - Sep '23 
    · Designed and implemented enterprise-grade web applications using Java, Spring MVC, and Thymeleaf, delivering seamless user experiences. 
    · Built modular and reusable UI components with Angular, TypeScript, and SCSS, ensuring cross-browser compatibility and responsiveness. 
    · Developed SOAP and RESTful APIs, enabling integration with external services and ensuring secure data transactions. 
    · Deployed containerized applications using Docker and managed orchestration with Kubernetes for consistent multi-environment operations. 
    · Integrated real-time messaging and notifications using WebSockets and RabbitMQ, improving user interaction. 
    · Optimized backend performance by implementing data caching with Redis and utilizing PostgreSQL for relational data management. 
    · Improved log analysis and error detection through Elasticsearch and Logstash, enabling faster troubleshooting. 
    · Conducted continuous integration and deployment with GitLab CI/CD, reducing manual intervention in build processes. 
    · Automated end-to-end testing with Protractor and Selenium, ensuring flawless user experiences. 
    · Worked closely with DevOps teams to monitor production systems via Prometheus and Grafana, maintaining system reliability. 
    Technology Used: Java, Spring MVC, Thymeleaf, Angular, TypeScript, SCSS, PostgreSQL, Docker, Kubernetes, RabbitMQ, WebSockets, Elasticsearch, Logstash, GitLab CI/CD, Protractor, Selenium, Prometheus, Grafana.  

    Ford-Motor                                                                                                                                                                                  Dearborn, MI 
    Full Stack Developer 	     Aug '19 - Jan '21 
    · Developed robust and scalable applications for vehicle management systems using Java, Struts, and EJB frameworks. 
    · Built and styled modern UI components with Vue.js, Vuetify, and JavaScript, enhancing internal tools for fleet management. 
    · Designed and implemented SOAP and REST APIs, enabling seamless communication across business systems and external vendors. 
    · Utilized MongoDB for managing unstructured vehicle data and optimized storage solutions for large datasets. 
    · Enabled real-time data streaming and analytics using Apache Kafka, improving operational insights. 
    · Automated build and deployment pipelines with Azure DevOps, ensuring streamlined software delivery. 
    · Integrated search functionalities using Elasticsearch, facilitating faster data retrieval for internal applications. 
    · Employed SonarQube for static code analysis, maintaining high coding standards and reducing vulnerabilities. 
    · Configured ActiveMQ for reliable message queuing, improving system integration processes. 
    · Worked with cross-functional teams using Azure Boards and implemented Agile methodologies, accelerating project completion. 
    Technology Used: Java, Struts, EJB, Vue.js, Vuetify, MongoDB, Apache Kafka, Elasticsearch, Azure DevOps, SonarQube, ActiveMQ, Azure Boards, SOAP APIs, RESTful APIs. 

    Education 
    
    University| Degree | B.S./M.S. in Major | Graduation Year 

    Projects 
    
    Loan Approval Automation System for Capital One 
    · Implemented a loan approval system using Java, Spring Boot, and Hibernate, optimizing decision-making processes. Designed a modern React.js interface with Redux and Material-UI, improving user accessibility for internal teams. Built secure RESTful APIs for real-time communication between systems, integrating authentication through OAuth2 and JWT. Deployed serverless workflows with AWS Lambda and ensured scalability and fault tolerance. Leveraged Jenkins for continuous integration and Docker for deployment across multiple environments. Monitored and debugged application performance using New Relic and Splunk, reducing downtime and enhancing operational efficiency. 
    Automated Billing System for T-Mobile 
    · Engineered an automated billing solution leveraging Java and Spring MVC to streamline billing processes and reduce manual intervention. 
    Designed intuitive Thymeleaf templates for the frontend, enhancing user interaction and accessibility. Managed data transactions with PostgreSQL and ensured data integrity through robust RESTful APIs. Deployed the application using Docker containers and managed orchestration with Kubernetes for efficient resource utilization. Implemented GitLab CI/CD pipelines to automate testing and deployment, utilizing Protractor and Selenium for end-to-end testing. Enhanced system monitoring and alerting with Prometheus and Grafana, ensuring high availability and performance. 
    Vehicle Diagnostic Data Processing System for Ford Motor 
    · Designed and deployed a Vehicle Diagnostic Data Processing System using Java, Struts, and EJB, enabling proactive vehicle health monitoring. Created a modern and interactive interface with Vue.js and Vuetify, providing real-time diagnostic updates. Utilized ActiveMQ for efficient message queuing between diagnostic devices and the central system. Integrated MongoDB to store large volumes of diagnostic data and Elasticsearch for efficient search and retrieval of vehicle records. Built RESTful APIs to expose data to third-party analytics tools and streamlined task management via Azure Boards. Ensured robust testing and deployment pipelines using Azure DevOps for continuous delivery. 

    Skills 
    
    · Programming Languages: Java, Python, JavaScript, Node.js, SQL, PHP, C, C++ IDE Tools: Eclipse, Netbeans, IntelliJ IDEA, Spring Tool Suite (STS), Maven, Gradle  
    · Web/App/DB Servers: WebLogic, Apache Tomcat, JBoss Web Services: SOAP, JAX-RS, JAX-WS, RESTful Web Services, Microservices 
    · Web Development: HTML, CSS, JavaScript, jQuery, React JS, Ajax, Bootstrap, Angular, Angular JS, Bootstrap  
    · Cloud Technologies: AWS, Google Cloud Platform, Microsoft Azure  
    · No SQL Databases: MongoDB, Apache Cassandra, Redis  
    · Relational Databases: MySQL, MS-SQL Server, Oracle, SQL Server, PostgreSQL  
    · Tools: Git, Docker, Postman, Jenkins, Kubernetes, Bamboo, Hudson, JIRA, Jenkins, Spring Boot Actuator  
    · Build and Testing Tools: JUnit, TestNG, Mockito, Apache JMeter, AssertJ, Jest, Mocha  
    · Logging and Monitoring Tools: Log4j, Prometheus, Grafana, Splunk  
    · Web Technologies: Servlet and JSP, Spring Frameworks (Spring MVC, Spring Boot), Hibernate ORM,JavaServer Faces (JSF), Java 
    Persistence API  
    · Version Controls: GIT (Github, Gitlab, BitBucket), SVN, CVS, JIRA  
    · Methodologies and Practices: Agile Development, Test Driven Development, Object Oriented Programming, Continuous 
    Integration/Continuous Deployment (CI/CD) pipelines, Domain-Driven Design (DDD), Event-Driven Architecture (EDA) 

     Format the output using HTML tags:
    Create a professional resume in **HTML** format with the following requirements:

      1. **Section Titles**:
        - Use <h2> tags for section titles like **Professional Summary**, **Work Experience**, **Education**, **Technical Skills**, **Certifications**, and **Projects**.

      2. **Subheadings**:
        - Use <strong> tags for company names, job titles, and project titles (e.g., <strong>Company Name</strong> and <strong>Job Title</strong>).

      3. **Descriptions**:
        - Use <p> tags for detailed descriptions and responsibilities.
        - Use <ul> and <li> tags for listing tasks, responsibilities, and achievements.

      4. **Links**:
        - Include links using the <a> tag (e.g., <a href="URL">Certification Name</a>).
 
  `;

  try {
    const resumeText = await generateText(resumePrompt);

    const resumeHtml = `
      <html>
        <head><style>body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }</style></head>
        <body>
          <p>${resumeText.replace(/\n/g, "<br>")}</p>
        </body>
      </html>
    `;
    const pdfBuffer = await generatePDF(resumeHtml);
    fs.writeFileSync("output.pdf", pdfBuffer);
    console.log("PDF saved to server as output.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate resume");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
