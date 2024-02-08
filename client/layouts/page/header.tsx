import { ReactNode } from "react";

const LayoutHeader = ({
  navStatus,
  children,
}: {
  navStatus: boolean;
  children: ReactNode;
}) => {
  return (
    <header
      className="flex-[0] lg:flex-[0_1_280px] h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 overflow-auto duration-100 "
      style={{
        flex: navStatus ? "0 1 280px" : "0",
        padding: navStatus ? "1rem" : "0",
      }}
    >
      {children}
    </header>
  );
};

export default LayoutHeader;
