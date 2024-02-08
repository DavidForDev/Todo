import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// ========== Components ========== \\
import Input from "../../../UIElements/input";
import Tags from "../../../UIElements/tags";
import TextArea from "../../../UIElements/textArea";
import Wrapper from "../wrapper.form";

// ========== Redux ========== \\
import { AppDispatch, RootState } from "../../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { editTaskItem } from "../../../../redux/slices/tasks/thunks/task.thunk";

// ========== Context ========== \\
import { ErrorContext } from "../../../../context/errors.context";

const TaskItemEditorForm = ({ modalId }: { modalId?: string }) => {
  const [taskItemDetail, setTaskItemDetail] = useState<Object>({});

  const [newName, setNewName] = useState<String>("");
  const [newAttach, setNewAttach] = useState<Array<Object>>([]);
  const [newDescription, setNewDescription] = useState<String>("");

  // =========== Router
  const router = useRouter();
  const { taskItemId }: any = router.query;

  // =========== redux
  const dispatch = useDispatch<AppDispatch>();
  const taskItemSelector = useSelector((select: RootState) => select.task);
  const { attach, description, taskItemName, status, _id }: any =
    taskItemDetail;

  // =========== Context
  const { makeError } = useContext(ErrorContext);

  // =========== Filter Task Item Detail
  useEffect(() => {
    if (!taskItemSelector.specialTask.taskItems || !taskItemId) return;

    const secitonNames = ["todo", "doing", "done"];

    for (let i = 0; i < secitonNames.length; i++) {
      const accrodingToStatus = secitonNames[i];

      const result = taskItemSelector.specialTask.taskItems[
        accrodingToStatus
      ].find((x: any) => x._id === taskItemId[0]);

      if (result) return setTaskItemDetail(result);
    }
  }, [taskItemDetail, taskItemSelector.specialTask.taskItems, taskItemId]);

  const updateTaskItem = () => {
    const payload = {
      taskItemId: _id,
      taskItemName: newName,
      description: newDescription,
      attach: newAttach,
    };

    if (!_id) return makeError("Something is wrong with the Id");

    if (taskItemName === "")
      return makeError("Please fill in all required fields");

    dispatch(editTaskItem(payload));
  };

  return (
    <Wrapper admitFunction={updateTaskItem} modalId={modalId}>
      <Input
        type="text"
        label="task item name"
        requireSign={true}
        placeholder="item name"
        giveValue={setNewName}
        defaultValue={taskItemName}
      />
      <Tags
        placeholder="add Links"
        coloration={false}
        label="attach Links"
        wordsLength={500}
        limitTag={10}
        giveValue={setNewAttach}
        defaultTags={attach}
      />
      <TextArea
        placeholder="task description"
        label="description"
        giveValue={setNewDescription}
        defaultValue={description}
      />
    </Wrapper>
  );
};

export default TaskItemEditorForm;
