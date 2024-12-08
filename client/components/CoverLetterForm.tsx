"use client";
import React, { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  interest: string;
  skills: string;
  achievements: string;
}

const CoverLetterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    interest: "",
    skills: "",
    achievements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/generate-cover-letter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }

      // Receive PDF buffer
      const pdfBlob = await response.blob();

      // Create a link to download the PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cover_letter.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="relative h-[855px] w-[575px] bg-gray-600 p-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-300">
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
      <h1 className="mt-5 text-2xl font-bold text-black ">
        Create New Cover Letter
      </h1>
      <form className="mt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-black font-semibold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-300"
            placeholder="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-black font-semibold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white"
            placeholder="@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-black font-semibold">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(XXX-XXX-XXXX)"
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-black font-semibold">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g.,Software Engineer, Product Manager)"
          />
        </div>
        <div>
          <label
            htmlFor="companyName"
            className="block text-black font-semibold"
          >
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g.,Google, Facebook)"
          />
        </div>
        <div>
          <label htmlFor="interest" className="block text-black font-semibold">
            Why Are You Interested in This Role?
          </label>
          <textarea
            id="interest"
            value={formData.interest}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Explain why you are interested in this role"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label htmlFor="skills" className="block text-black font-semibold">
            Skills
          </label>
          <input
            id="skills"
            type="text"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., JavaScript, teamwork)"
          />
        </div>
        <div>
          <label
            htmlFor="achievements"
            className="block text-black font-semibold"
          >
            Achievements
          </label>
          <textarea
            id="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Highlight top 2-3 achievements"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 w-[225px] bg-gray-400 text-white font-bold p-2 rounded-md hover:bg-gray-500"
        >
          Generate Cover Letter
        </button>
      </form>
    </div>
  );
};

export default CoverLetterForm;
