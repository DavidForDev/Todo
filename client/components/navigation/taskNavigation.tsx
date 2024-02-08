import { useContext } from "react";

// =========== Icons ========== \\
import LeftArrow from "../../public/icons/leftArrow";
import PlusIcon from "../../public/icons/plus";
import EditIcon from "../../public/icons/edit";
import RemoveIcon from "../../public/icons/remove";
import HomeIcon from "../../public/icons/home";

// =========== Components ========== \\
import NavCard from "./navCard";

// =========== Context ========== \\
import { modalContext } from "../../context/modal.context";

// =========== Redux ========== \\
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const TaskNavigation = ({ navToggle }: any) => {
  const { toggleModal } = useContext(modalContext);

  // ===== redux
  const selector = useSelector((select: RootState) => select.task);

  const { _id, taskName } = selector.specialTask;

  const navBase = [
    {
      name: "home",
      svg: <HomeIcon />,
      href: "/tasks",
    },
    {
      name: "add item",
      svg: <PlusIcon />,
      href: "#",
      toggleModal: () => toggleModal("taskitemcreator"),
    },
    {
      name: "edit task",
      svg: <EditIcon />,
      href: "#",
      toggleModal: () => toggleModal("taskeditor"),
    },
    {
      name: "remove task",
      svg: <RemoveIcon />,
      href: "#",
      toggleModal: () => toggleModal("removetask"),
    },
  ];

  return (
    <nav className="flex flex-col gap-5 h-full">
      <div className="flex justify-between gap-2 p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-red-500 to-orange-500"></div>
          <h3 className="text-xs">{taskName}</h3>
        </div>
        <LeftArrow stroke="#667085" onClick={() => navToggle(false)} />
      </div>
      <div className="flex flex-col h-full">
        <ul className="flex flex-col gap-2 flex-1">
          {navBase.map((detail, index) => {
            return <NavCard detail={detail} key={index} />;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default TaskNavigation;
