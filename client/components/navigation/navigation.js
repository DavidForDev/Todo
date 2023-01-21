// ========== Icons ========== \\
import DashboardSvg from "../../public/icons/dashboard";
import FolderSvg from "../../public/icons/folder";
import BurgerSvg from "../../public/icons/burger";

// ========== Component ========== \\
import List from "./list";

const Navigation = ({ switchSideNav }) => {
  const listBase = [
    { name: "Dashboard", svg: <DashboardSvg />, href: "/" },
    { name: "Collections", svg: <FolderSvg />, href: "/collections" },
  ];

  return (
    <div className="z-40 w-full px-5 bg-[#21212B]">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {switchSideNav && (
            <BurgerSvg onClick={() => switchSideNav((prev) => !prev)} />
          )}
          <ul className="flex gap-1 items-center">
            {listBase.map((el, index) => {
              return <List key={index} data={el} />;
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
