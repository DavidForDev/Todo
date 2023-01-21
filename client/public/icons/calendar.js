import React from "react";

function CalendarSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="icon line"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#B38148"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        {...props}
        d="M20 21H4a1 1 0 01-1-1V5a1 1 0 011-1h16a1 1 0 011 1v15a1 1 0 01-1 1zm0-17H4a1 1 0 00-1 1v4h18V5a1 1 0 00-1-1zm-3-1v2m-5-2v2M7 3v2"
      ></path>
    </svg>
  );
}

export default CalendarSvg;
