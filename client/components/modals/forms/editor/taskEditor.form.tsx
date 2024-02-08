import { useContext, useState } from "react";

// =========== Components ========== \\
import Input from "../../../UIElements/input";
import Tags from "../../../UIElements/tags";
import Wrapper from "../wrapper.form";

// =========== Redux ========== \\
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../../../redux/slices/tasks/thunks/task.thunk";

// =========== Context ========== \\
import { ErrorContext } from "../../../../context/errors.context";

const TaskEditorForm = ({ modalId }: { modalId?: string }) => {
  const [newTaskName, setNewTaskName] = useState<String>("");
  const [newTaskTags, setNewTaskTags] = useState<Array<Object>>([]);

  // ======== Redux
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((select: RootState) => select.task);
  const { _id, taskName, tags } = selector.specialTask;

  // ======== Context
  const { makeError } = useContext(ErrorContext);

  const editTaskHandle = () => {
    const payload = {
      _id,
      newData: {
        newTaskName,
        newTaskTags,
      },
    };

    if (!_id) return makeError("Something is wrong with the Id");

    if (newTaskName === "")
      return makeError("Please fill in all required fields");

    dispatch(editTask(payload));
  };

  return (
    <Wrapper admitFunction={editTaskHandle} modalId={modalId}>
      <Input
        placeholder="Task Name"
        type="text"
        label="Task Name"
        giveValue={setNewTaskName}
        defaultValue={taskName}
        requireSign={true}
      />
      <Tags
        giveValue={setNewTaskTags}
        coloration={true}
        placeholder="add tags"
        defaultTags={tags}
        label="add Task"
      />
    </Wrapper>
  );
};

export default TaskEditorForm;
