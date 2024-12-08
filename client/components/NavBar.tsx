import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex flex-col justify-between h-[600px] w-[72px] bg-gray-400 p-1 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200 hover:cursor-pointer">
      <Image
        src="/images/profile.png"
        alt="Picture of the author"
        width={65}
        height={65}
        className="rounded-full p-1 hover:cursor-pointer hover:scale-105"
      />

      <Image
        src="/icons/resume.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="hover:cursor-pointer hover:scale-105 "
      />
      <Image
        src="/icons/coverletter.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="rounded-full hover:cursor-pointer hover:scale-105"
      />

      <Image
        src="/icons/webpage.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="hover:cursor-pointer hover:scale-105 p-2"
      />
      <Image
        src="/icons/piechart.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="rounded-full hover:cursor-pointer hover:scale-105"
      />

      <Image
        src="/icons/github.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="rounded-full hover:cursor-pointer hover:scale-105"
      />
      <Image
        src="/icons/mail.svg"
        alt="Picture of the author"
        width={65}
        height={65}
        className="rounded-full hover:cursor-pointer hover:scale-105"
      />
    </div>
  );
};

export default NavBar;
