import { ReactNode, SetStateAction } from "react";

import OpenNavigation from "./openNavigation";

const LayoutMain = ({
  children,
  setNavStatus,
  navStatus,
}: {
  children: ReactNode;
  setNavStatus: SetStateAction<any>;
  navStatus: boolean;
}) => {
  return (
    <main className="flex-1 h-full bg-[#F2F4F7] p-4">
      {!navStatus ? <OpenNavigation openHandle={setNavStatus} /> : ""}
      {children}
    </main>
  );
};

export default LayoutMain;
