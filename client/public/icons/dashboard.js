import React from "react";

function DashboardSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      className="icon glyph"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="9" height="11" x="2" y="2" fill="#BCBCBF" rx="2"></rect>
      <rect width="9" height="7" x="13" y="2" fill="#BCBCBF" rx="2"></rect>
      <rect width="9" height="7" x="2" y="15" fill="#BCBCBF" rx="2"></rect>
      <rect width="9" height="11" x="13" y="11" fill="#BCBCBF" rx="2"></rect>
    </svg>
  );
}

export default DashboardSvg;
