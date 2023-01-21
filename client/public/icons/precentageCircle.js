import * as React from "react";

const Precentage = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg viewBox="0 0 36 36" {...props}>
      <path
        d="M18 2.0845       a 15.9155 15.9155 0 0 1 0 31.831       a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#32323F"
        strokeWidth={5}
        strokeDasharray="100, 100"
      />
    </svg>
    <svg viewBox="0 0 36 36" {...props}>
      <path
        d="M18 2.0845       a 15.9155 15.9155 0 0 1 0 31.831       a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={`${props.color}`}
        strokeWidth={5}
        strokeDasharray={`${props.precent ? props.precent : 0}, 100`}
      />
    </svg>
  </svg>
);

export default Precentage;
