import React from "react";

const PieChartCard = () => {
  return (
    <div className="h-[62px] w-[62px] bg-gray-400 p-1 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:border-black hover:border-4">
      <svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
      >
        <style type="text/css">{`
	.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
`}</style>
        <g>
          <path d="M27.7,8.3l-10.2,7.8l9.1,9.1c2.1-2.5,3.4-5.7,3.4-9.2C30,13.1,29.1,10.5,27.7,8.3z" />
          <path d="M17,14l9.4-7.3c-2.4-2.6-5.7-4.4-9.4-4.7V14z" />
          <path
            d="M15.3,16.7C15.3,16.7,15.3,16.7,15.3,16.7C15.2,16.6,15.2,16.6,15.3,16.7c-0.1-0.1-0.1-0.2-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2
		s0-0.1,0-0.2c0,0,0-0.1,0-0.1V2.1C7.7,2.6,2,8.6,2,16c0,7.7,6.3,14,14,14c3.5,0,6.7-1.3,9.2-3.4L15.3,16.7z"
          />
        </g>
      </svg>
    </div>
  );
};

export default PieChartCard;
