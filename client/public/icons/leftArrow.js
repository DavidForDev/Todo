import * as React from "react";

const LeftArrowSvg = (props) => (
  <svg
    id="left-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={23}
    height={23}
    {...props}
  >
    <polyline
      id="primary"
      points="18 3 6 12 18 21"
      style={{
        fill: "none",
        stroke: "white",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1,
      }}
    />
  </svg>
);
export default LeftArrowSvg;
