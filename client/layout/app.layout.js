import { useState } from "react";

// ========== Components ========== \\
import Navigation from "../components/navigation/navigation";
import SideNavigation from "../components/sideNavigation/sideNavigation";

const AppLayout = ({ children }) => {
  const [side, setSide] = useState(true);

  const switchSideNav = (value) => {
    setSide(value);
  };

  return (
    <>
      <header className="w-full">
        <Navigation switchSideNav={switchSideNav} />
      </header>
      <main className="flex w-full h-full">
        <aside>
          <SideNavigation side={side} />
        </aside>
        <div className="p-5 w-full h-full overflow-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
