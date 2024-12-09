import { Tooltip } from "@radix-ui/react-tooltip";
import Image from "next/image";
import React from "react";
import TooltipComponent from "./TooltipComponent";

const NavBar = () => {
  return (
    <div className="flex flex-col justify-between h-[600px] w-[72px] bg-gray-400 p-1 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200 hover:cursor-pointer">
      <TooltipComponent text="Profile" color="white">
        <Image
          src="/images/profile.png"
          alt="Picture of the author"
          width={65}
          height={65}
          className="rounded-full p-1 hover:cursor-pointer hover:scale-105"
        />
      </TooltipComponent>
      <TooltipComponent text=" Generate Resume">
        <Image
          src="/icons/resume.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          className="hover:cursor-pointer hover:scale-105 "
        />
      </TooltipComponent>
      <TooltipComponent text="Generate Cover Letter">
        <Image
          src="/icons/coverletter.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          className="rounded-full hover:cursor-pointer hover:scale-105"
        />
      </TooltipComponent>

      <TooltipComponent text="Learn to create Webpage">
        <Image
          src="/icons/webpage.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          className="hover:cursor-pointer hover:scale-105 p-2"
        />
      </TooltipComponent>
      <TooltipComponent text="Chart.js">
        <Image
          src="/icons/piechart.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          className="rounded-full hover:cursor-pointer hover:scale-105"
        />
      </TooltipComponent>

      <TooltipComponent text="Git in VS CODE">
        <Image
          src="/icons/github.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          onClick={() =>
            window.open(
              "https://code.visualstudio.com/docs/sourcecontrol/intro-to-git",
              "_blank"
            )
          }
          className="rounded-full hover:cursor-pointer hover:scale-105"
        />
      </TooltipComponent>
      <TooltipComponent text="Generate Email">
        <Image
          src="/icons/mail.svg"
          alt="Picture of the author"
          width={65}
          height={65}
          className="rounded-full hover:cursor-pointer hover:scale-105"
        />
      </TooltipComponent>
    </div>
  );
};

export default NavBar;
