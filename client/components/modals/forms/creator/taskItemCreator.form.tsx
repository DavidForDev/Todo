import { useContext, useState } from "react";
import { useRouter } from "next/router";

// =========== UIelements ========== \\
import Input from "../../../UIElements/input";
import TextArea from "../../../UIElements/textArea";

// =========== Components ========== \\
import Wrapper from "../wrapper.form";
import Tags from "../../../UIElements/tags";

// =========== Redux ========== \\
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { createTaskItem } from "../../../../redux/slices/tasks/thunks/task.thunk";

// =========== Context ========== \\
import { ErrorContext } from "../../../../context/errors.context";

const TaskItemCreatorForm = ({ modalId }: { modalId: string }) => {
  const [itemName, setItemName] = useState<String>("");
  const [attachLink, setAttachLink] = useState<Array<String>>([]);
  const [description, setDescription] = useState<String>("");

  const router = useRouter();
  const { taskId } = router.query;

  // ========== Redux
  const dispatch = useDispatch<AppDispatch>();

  // ========== Context
  const { makeError } = useContext(ErrorContext);

  const createTaskItemHandle = () => {
    const payload = {
      taskId: taskId,
      taskItemName: itemName,
      description: description,
      attach: attachLink,
    };

    if (itemName === "") return makeError("Please fill in all required fields");

    dispatch(createTaskItem(payload));
  };

  return (
    <Wrapper admitFunction={createTaskItemHandle} modalId={modalId}>
      <Input
        type="text"
        label="task item name"
        requireSign={true}
        placeholder="item name"
        giveValue={setItemName}
      />
      <Tags
        giveValue={setAttachLink}
        placeholder="add Links"
        coloration={false}
        label="attach Links"
        wordsLength={500}
        limitTag={10}
      />
      <TextArea
        placeholder="task description"
        label="description"
        giveValue={setDescription}
      />
    </Wrapper>
  );
};

export default TaskItemCreatorForm;
