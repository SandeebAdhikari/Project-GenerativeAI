import React from "react";

const ResumeForm = () => {
  return (
    <div className="relative h-[875px] w-[575px] bg-gray-600 p-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-300">
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
      <form className="mt-5 flex flex-col gap-2">
        {/* Professional Summary */}
        <div>
          <label htmlFor="summary" className="block text-black font-semibold">
            Professional Summary
          </label>
          <textarea
            id="summary"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="A brief summary about your career goals and expertise"
            rows={3}
          ></textarea>
        </div>

        {/* Work Experience */}
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
            placeholder="Include job title, company, location, start and end dates, and key responsibilities"
            rows={4}
          ></textarea>
        </div>

        {/* Education */}
        <div>
          <label htmlFor="education" className="block text-black font-semibold">
            Education
          </label>
          <textarea
            id="education"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="Include degree, institution, location, graduation year, and major"
            rows={4}
          ></textarea>
        </div>

        {/* Technical Skills */}
        <div>
          <label htmlFor="skills" className="block text-black font-semibold">
            Technical Skills
          </label>
          <input
            id="skills"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., JavaScript, Python, React)"
          />
        </div>

        {/* Certifications */}
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
            placeholder="Include certification name and issuing organization"
            rows={3}
          ></textarea>
        </div>

        {/* Hobbies/Interests */}
        <div>
          <label htmlFor="hobbies" className="block text-black font-semibold">
            Hobbies/Interests (Optional)
          </label>
          <input
            id="hobbies"
            type="text"
            className="w-full p-2 rounded-md border border-gray-200 hover:border-gray-500 focus:outline-none bg-transparent placeholder-gray-100"
            placeholder="(e.g., Reading, Traveling, Painting)"
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
