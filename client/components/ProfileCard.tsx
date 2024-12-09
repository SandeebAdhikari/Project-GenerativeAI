import Image from "next/image";
import React from "react";
import TooltipComponent from "./TooltipComponent";

const ProfileCard = () => {
  return (
    <TooltipComponent text="Create a Portfolio webpage!">
      <div className="flex items-center justify-center h-[75px] w-[75px] p-3 bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:border-gray-200 hover:border-4">
        <Image
          src="/images/profile.png"
          alt="Picture of the author"
          width={75}
          height={75}
          className="rounded-full"
        />
      </div>
    </TooltipComponent>
  );
};

export default ProfileCard;
