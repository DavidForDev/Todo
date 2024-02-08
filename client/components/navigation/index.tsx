import { SetStateAction, useContext, useEffect, useMemo } from "react";

// ========== Components ========== \\
import NavCard from "./navCard";

// ========== Icons ========== \\
import SettingsIcon from "../../public/icons/settings";
import TasksIcon from "../../public/icons/tasks";
import LogOutIcon from "../../public/icons/logOut";
import LeftArrow from "../../public/icons/leftArrow";

// ========== Redux ========== \\
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/account/index.slice";
import { currentUser } from "../../redux/slices/account/thunks/user.thunks";

const Navigation = ({ navToggle }: { navToggle: SetStateAction<any> }) => {
  // ======= Redux
  const dispatch = useDispatch<AppDispatch>();
  const accountSelector = useSelector((select: RootState) => select.account);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const navigations = [
    {
      name: "tasks",
      svg: <TasksIcon />,
      href: "/tasks",
      quantity: accountSelector.tasks ? accountSelector.tasks.length : 0,
    },
    {
      name: "settings",
      svg: <SettingsIcon />,
      href: "/settings",
    },
  ];

  return (
    <nav className="flex flex-col gap-5 h-full">
      <div className="flex justify-between gap-2 p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-red-500 to-orange-500"></div>
          <h3 className="text-xs">
            {accountSelector.currentUser
              ? accountSelector.currentUser.userName
              : ""}
          </h3>
        </div>
        <LeftArrow stroke="#667085" onClick={() => navToggle(false)} />
      </div>
      <div className="flex flex-col h-full">
        <ul className="flex flex-col gap-2 flex-1">
          {navigations.map((detail, index) => {
            return <NavCard detail={detail} key={index} />;
          })}
        </ul>
        <NavCard
          detail={{
            name: "log out",
            svg: <LogOutIcon />,
            href: "",
            toggleModal: () => dispatch(logOut()),
          }}
        />
      </div>
    </nav>
  );
};

export default Navigation;
