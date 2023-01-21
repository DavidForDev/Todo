import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput, SecondaryButton } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// =========== Contexts ============ \\
import { toolsContext } from "../../../contexts/tools.context";

const TasksEditForm = ({ data }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const { editTask, removeTask } = useContext(toolsContext);
  const router = useRouter();

  return (
    <FormLayout
      admitFunction={async () => {
        await editTask(data._id, taskTitle);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        defaultValue={data.tasksTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <SecondaryButton
        type="button"
        onClick={async () => {
          await removeTask(data._id);
          await router.replace(router.asPath);
        }}
      >
        Remove Task
      </SecondaryButton>
    </FormLayout>
  );
};

export default TasksEditForm;
