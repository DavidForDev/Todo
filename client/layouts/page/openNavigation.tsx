import React, { SetStateAction } from "react";

// ========== Icons ========= \\
import RightArrow from "../../public/icons/rightArrow";

const OpenNavigation = ({
  openHandle,
}: {
  openHandle: SetStateAction<boolean | any>;
}) => {
  return (
    <div
      onClick={() => openHandle(true)}
      className="animate-pulse cursor-pointer fixed top-1/2 -left-12 hover:-left-8 hover:animate-none z-20 duration-100 bg-white rounded-full p-2 w-24 justify-end flex border border-solid border-[#E6E4F0]"
    >
      <RightArrow />
    </div>
  );
};

export default OpenNavigation;
