import React from "react";
import TooltipComponent from "@/components/TooltipComponent";

const ContactCard = () => {
  return (
    <TooltipComponent text="Have question? Contact Us!">
      <div className="flex items-center justify-center h-[54px] w-[79px] p-4 bg-red-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-black border-4 scale-105  ">
        <svg
          width="75px"
          height="52px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 12H9v-.148c0-.876.306-1.499 1-1.852.385-.195 1-.568 1-1a1.001 1.001 0 00-2 0H7c0-1.654 1.346-3 3-3s3 1 3 3-2 2.165-2 3zm-2 3h2v-2H9v2z"
            fill="black"
          />
          <path
            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1116 0 8 8 0 01-16 0z"
            fill="black"
          />
        </svg>
      </div>
    </TooltipComponent>
  );
};

export default ContactCard;
