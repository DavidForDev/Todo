import React from "react";

function BurgerSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      className="icon glyph"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#BCBCBF"
        d="M21 19H3a1 1 0 010-2h18a1 1 0 010 2zM21 13H3a1 1 0 010-2h18a1 1 0 010 2zM21 7H3a1 1 0 010-2h18a1 1 0 010 2z"
      ></path>
    </svg>
  );
}

export default BurgerSvg;
