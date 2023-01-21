import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// =========== Contexts ============ \\
import { toolsContext } from "../../../contexts/tools.context";

const TasksForm = ({ data }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const { createTasks } = useContext(toolsContext);
  const router = useRouter();

  return (
    <FormLayout
      admitFunction={async () => {
        await createTasks(data._id, data.collectionAuthor._id, taskTitle);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        placeholder="Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />
    </FormLayout>
  );
};

export default TasksForm;
