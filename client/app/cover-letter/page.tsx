import CoverLetterForm from "@/components/CoverLetterForm";
import GoBackButton from "@/components/GoBackButton";
import React from "react";

const CoverLetterPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute top-2 left-[1168px]">
        <GoBackButton color="black" />
      </div>
      <CoverLetterForm />
    </div>
  );
};

export default CoverLetterPage;
