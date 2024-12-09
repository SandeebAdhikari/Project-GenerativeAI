"use client";
import React, { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  state: string;
  zipCode: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  skills: string;
  achievements: string;
  jobDescription: string;
}

const CoverLetterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    address: "",
    state: "",
    zipCode: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    skills: "",
    achievements: "",
    jobDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    try {
      const response: Response = await fetch(
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
        const errorResponse = await response.text();
        console.error("Error from server:", errorResponse);
        throw new Error("Failed to generate cover letter");
      }

      const pdfBlob: Blob = await response.blob();

      const url: string = URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");

      console.log("Downloaded Blob Size:", pdfBlob.size);

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cover_letter.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Cover letter downloaded successfully.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error occurred:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="mt-5 relative h-[905px] w-[595px] bg-gray-600 p-4 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-300">
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
      <form className="mt-5 flex flex-col gap-1" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-black font-semibold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-300 text-black font-medium"
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white text-black font-medium"
            placeholder="@example.com"
          />
        </div>
        <div className="flex gap-2">
          <div>
            <label htmlFor="address" className="block text-black font-semibold">
              Address
            </label>
            <input
              id="address"
              type="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white text-black font-medium"
              placeholder="(e.g., 1234 Main St)"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-black font-semibold">
              State
            </label>
            <input
              id="state"
              type="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white text-black font-medium"
              placeholder="(e.g., CA, NY)"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-black font-semibold">
              Zip Code
            </label>
            <input
              id="zipCode"
              type="zip"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white text-black font-medium"
              placeholder="(e.g., 12345)"
            />
          </div>
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
            placeholder="(e.g.,Google, Facebook)"
          />
        </div>
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-black font-semibold"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
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
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100 text-black font-medium"
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
