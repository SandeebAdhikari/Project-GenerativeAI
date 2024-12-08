import GoBackButton from "@/components/GoBackButton";
import ResumeForm from "@/components/ResumeForm";
import React from "react";

const ResumePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute top-2 left-[1168px]">
        <GoBackButton color="black" />
      </div>
      <ResumeForm />
    </div>
  );
};

export default ResumePage;
