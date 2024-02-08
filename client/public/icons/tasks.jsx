import * as React from "react";
const TasksIcon = (props) => (
  <svg
    data-icon-name="dashboard"
    data-style="line"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    id="dashboard"
    strokeWidth={1.5}
    className="w-6 h-6"
    stroke="#F94C10"
    {...props}
  >
    <path
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: "#F94C10",
      }}
      d="M9,12H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H9a1,1,0,0,1,1,1v7A1,1,0,0,1,9,12ZM21,7V4a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1V7a1,1,0,0,0,1,1h5A1,1,0,0,0,21,7ZM10,20V17a1,1,0,0,0-1-1H4a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1H9A1,1,0,0,0,10,20Zm11,0V13a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h5A1,1,0,0,0,21,20Z"
      id="primary"
    />
  </svg>
);
export default TasksIcon;
