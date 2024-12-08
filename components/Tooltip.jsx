import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-1 text-white bg-black text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
