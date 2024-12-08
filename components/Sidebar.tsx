import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center h-[752px] w-[370px] bg-gray-200 p-1 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200">
      <Image
        src="/images/profile.png"
        alt="Picture of the author"
        width={105}
        height={105}
        className="mt-10 rounded-full p-1 hover:cursor-pointer hover:scale-105 border-2 border-gray-400"
      />
      <h1 className="mt-2 text-3xl font-bold text-gray-800">JOHN DOE</h1>

      <div className="mt-24 w-full">
        <h1 className="text-2xl font-semibold p-1 text-black underline text-center">
          RESUME
        </h1>
        <ul className="p-1">
          <li className="p-3  bg-gray-100 text-lg font-semibold text-black hover:bg-gray-200 rounded-2xl text-center">
            resume.pdf
          </li>
        </ul>
      </div>
      <div className="mt-10 w-full">
        <h1 className="text-2xl font-semibold p-1 text-black underline text-center">
          COVER LETTER
        </h1>
        <ul className="p-1">
          <li className="p-3 text-lg bg-gray-100 font-semibold text-black hover:bg-gray-200 rounded-2xl text-center">
            coverLetter.pdf
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
