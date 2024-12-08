"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface GoBackButtonProps {
  color: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ color }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    if (pathname === "/resume") {
      router.push("/");
    } else if (pathname === "/cover-letter") {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="flex items-center justify-center gap-2"
    >
      <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 9L2 5l4-4"
          stroke="#9ca3af"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <h1 className={`font-bold text-${color} text-md hover:underline`}>
        Go Back
      </h1>
    </button>
  );
};

export default GoBackButton;
