import React from "react";
import GoBackButton from "./GoBackButton";

const CoverLetterForm = () => {
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
      <form className="mt-5 flex flex-col gap-2">
        <div>
          <label htmlFor="fullName" className="block text-black font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-300"
            placeholder="Full Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-black font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-white"
            placeholder="@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-black font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(XXX-XXX-XXXX)"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-black font-medium">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g.,Software Engineer, Product Manager)"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-black font-medium">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g.,Google, Facebook)"
          />
        </div>

        <div>
          <label htmlFor="interest" className="block text-black font-medium">
            Why Are You Interested in This Role?
          </label>
          <textarea
            id="interest"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Explain why you are interested in this role"
            rows={3}
          ></textarea>
        </div>

        <div>
          <label htmlFor="skills" className="block text-black font-medium">
            Skills
          </label>
          <input
            id="skills"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., JavaScript, teamwork)"
          />
        </div>

        <div>
          <label
            htmlFor="achievements"
            className="block text-black font-medium"
          >
            Achievements
          </label>
          <textarea
            id="achievements"
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
