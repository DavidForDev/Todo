import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// ========== Components ========== \\
import Wrapper from "../wrapper.form";

// ========== Redux ========== \\
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { changeItemStatus } from "../../../../redux/slices/tasks/thunks/task.thunk";

const TaskStatusEditorForm = () => {
  const [newStatus, setNewStatus] = useState<String>("");
  const [defaultStatus, setDefaultStatus] = useState<String>("");

  // ========= Router
  const router = useRouter();
  const { taskItemId } = router.query;

  // ========= Redux
  const dipsatch = useDispatch<AppDispatch>();
  const selector = useSelector((select: RootState) => select.task);

  useEffect(() => {
    if (!selector.specialTask.taskItems || !taskItemId) return;

    const secitonNames = ["todo", "doing", "done"];

    for (let i = 0; i < secitonNames.length; i++) {
      const accrodingToStatus = secitonNames[i];

      const result = selector.specialTask.taskItems[accrodingToStatus].find(
        (x: any) => x._id === taskItemId[0]
      );

      if (result) return setDefaultStatus(result.status);
    }
  }, [selector.specialTask.taskItems, taskItemId]);

  const changeTaskStatus = () => {
    if (newStatus === "" || defaultStatus === newStatus) return;

    const payload = {
      newStatus: newStatus,
      taskItemId: taskItemId,
    };

    dipsatch(changeItemStatus(payload));
  };

  return (
    <Wrapper modalId="" admitFunction={changeTaskStatus}>
      <select
        className="border border-solid border-black"
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </select>
    </Wrapper>
  );
};

export default TaskStatusEditorForm;
