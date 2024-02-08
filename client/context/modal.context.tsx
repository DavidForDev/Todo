import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type TypeInitialState = {
  toggleModal: (arg: String) => void;
  modals: Array<Object>;
};

let InitialState = {
  toggleModal: () => {},
  modals: [],
};

// ========== Modal Forms ========== \\
import TaskCreatorForm from "../components/modals/forms/creator/taskCreator.form";
import TaskItemCreatorForm from "../components/modals/forms/creator/taskItemCreator.form";
import TaskItemEditorForm from "../components/modals/forms/editor/taskItemEditor.form";
import TaskEditorForm from "../components/modals/forms/editor/taskEditor.form";
import TaskItemDetail from "../components/modals/forms/detail/taskItemDetail";
import RemoveTaskForm from "../components/modals/forms/barrier/removeTask.form";
import RemoveTaskItemForm from "../components/modals/forms/barrier/removeTaskItem";
import TaskStatusEditorForm from "../components/modals/forms/editor/taskStatus.form";
import RemoveAccountForm from "../components/modals/forms/barrier/removeAccount.form";

// ========== Icons ========== \\
import RemoveIcon from "../public/icons/remove";
import EditIcon from "../public/icons/edit";

export const modalContext = createContext<TypeInitialState>(InitialState);

const ModalContextWrapper = ({ children }: { children: ReactNode }) => {
  const [stillOpen, setStillOpen] = useState<boolean>();
  const router = useRouter();
  const { taskItemId } = router.query;

  // ========= Array of Modals
  const [modals, setModals] = useState<any>([]);

  useEffect(() => {
    setStillOpen(Boolean(taskItemId));

    const modals = [
      {
        id: "taskcreator",
        name: "task creator",
        content: <TaskCreatorForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "taskitemcreator",
        name: "task item creator",
        content: <TaskItemCreatorForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "taskitemeditor",
        name: "task item editor",
        content: <TaskItemEditorForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "taskeditor",
        name: "task editor",
        content: <TaskEditorForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "taskdetail",
        name: "",
        content: <TaskItemDetail />,
        visibleStatus: stillOpen,
        rightSide: true,
        more: [
          {
            svg: <EditIcon />,
            name: "edit",
            function: () => toggleModal("taskitemeditor"),
          },
          {
            svg: <RemoveIcon />,
            name: "remove",
            function: () => toggleModal("removetaskItem"),
          },
        ],
      },
      {
        id: "removetask",
        name: "warning",
        content: <RemoveTaskForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "removetaskItem",
        name: "warning",
        content: <RemoveTaskItemForm modalId="" />,
        visibleStatus: false,
      },
      {
        id: "taskStatusEditor",
        name: "edit Task Status",
        content: <TaskStatusEditorForm />,
        visibleStatus: false,
      },
      {
        id: "removeaccount",
        name: "warning",
        content: <RemoveAccountForm modalId="" />,
        visibleStatus: false,
      },
    ];
    setModals(modals);
  }, [taskItemId, stillOpen]);

  // ========= Open Model
  const toggleModal = (arg: String) => {
    if (!arg) return null;

    const modalerIndex = modals.findIndex((x: any) => x.id === arg);
    const currentStatus = modals[modalerIndex].visibleStatus;

    modals.map((el: any) => {
      el.visibleStatus = false;
      modals[modalerIndex].visibleStatus = !currentStatus;
    });

    setModals([...modals]);
  };

  // ========== Finally
  const value = {
    toggleModal: toggleModal,
    modals: modals,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
};

export default ModalContextWrapper;
