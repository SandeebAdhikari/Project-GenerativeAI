"use client";
import React, { useState } from "react";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    summary: "",
    experience: "",
    education: "",
    skills: "",
    certifications: "",
    Projects: "",
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response: Response = await fetch(
        "http://localhost:3000/generate-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const pdfBlob: Blob = await response.blob();

      const url: string = window.URL.createObjectURL(pdfBlob);
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  return (
    <div className="mt-5 relative h-[900px] w-[575px] bg-gray-600 p-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-300">
      <div className="absolute -top-12 left-0 p-4">
        <svg
          width="66"
          height="66"
          viewBox="0 0 56 56"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
            fill="#9ca3af"
          />
          <path
            d="M30.3425 36V30.1657H36.0295V25.8637H30.3425V20H25.7459V25.8637H20V30.1657H25.7459V36H30.3425Z"
            fill="white"
          />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-black ">Create New Resume</h1>
      <form className="mt-5 flex flex-col gap-1" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="summary" className="block text-black font-semibold">
            Professional Summary
          </label>
          <textarea
            id="summary"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Briefly describe your professional background and career goals"
            rows={3}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="experience"
            className="block text-black font-semibold"
          >
            Work Experience
          </label>
          <textarea
            id="experience"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Job title, company, location, and dates of employment"
            rows={4}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="education" className="block text-black font-semibold">
            Education
          </label>
          <textarea
            id="education"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Degree, major, University, location, and graduation year"
            rows={4}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="skills" className="block text-black font-semibold">
            Technical Skills
          </label>
          <input
            id="skills"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., JavaScript, Python, React)"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="certifications"
            className="block text-black font-semibold"
          >
            Certifications
          </label>
          <textarea
            id="certifications"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., AWS Certified Solutions Architect, Google IT Support Professional)"
            rows={3}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="project" className="block text-black font-semibold">
            Projects
          </label>
          <textarea
            id="project"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., Portfolio website, E-commerce app)"
            rows={3}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-[225px] bg-gray-400 text-white font-bold p-2 rounded-md hover:bg-gray-500"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
