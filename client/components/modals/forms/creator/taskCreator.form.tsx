import { useContext, useState } from "react";

// =========== Components ========== \\
import Input from "../../../UIElements/input";
import Tags from "../../../UIElements/tags";
import Wrapper from "../wrapper.form";

// =========== Redux ========== \\
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../redux/slices/tasks/thunks/task.thunk";

// =========== Context =========== \\
import { ErrorContext } from "../../../../context/errors.context";

const TaskCreatorForm = ({ modalId }: { modalId: string }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskTags, setTaskTags] = useState<Array<Object>>([]);

  // ========= Context
  const { makeError } = useContext(ErrorContext);

  // ========= Redux
  const dispatch = useDispatch<AppDispatch>();

  const createTaskHandle = () => {
    const payload: any = {
      taskName,
      taskTags,
    };

    if (taskName === "") return makeError("Please fill in all required fields");

    dispatch(createTask(payload));

    setTaskName("");
    setTaskTags([]);
  };

  return (
    <Wrapper admitFunction={createTaskHandle} modalId={modalId}>
      <Input
        placeholder="Task Name"
        type="text"
        label="Task Name"
        giveValue={setTaskName}
        defaultValue={taskName}
        requireSign={true}
      />
      <Tags
        giveValue={setTaskTags}
        coloration={true}
        placeholder="add tags"
        defaultTags={taskTags}
        label="add Task"
      />
    </Wrapper>
  );
};

export default TaskCreatorForm;
