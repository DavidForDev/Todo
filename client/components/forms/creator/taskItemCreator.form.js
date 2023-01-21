import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// ========== Contexts ========= \\
import { toolsContext } from "../../../contexts/tools.context";

// ========== Helper ========= \\
import { dateEngine } from "../../../helper/date.helper";

const TaskItemForm = ({ data }) => {
  const [taskItemTitle, setTaskItemTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState();
  const { createTasksItem } = useContext(toolsContext);
  const router = useRouter();

  // =========== Date Enginge =========== \\
  const { day, month, year } = dateEngine();
  const dateForm = year + "-" + month + "-" + day;

  return (
    <FormLayout
      admitFunction={async () => {
        await createTasksItem(data._id, taskItemTitle, taskDeadline);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        placeholder="Task Title"
        onChange={(e) => setTaskItemTitle(e.target.value)}
      />
      <PrimaryInput
        type="date"
        min={dateForm}
        onChange={(e) => setTaskDeadline(new Date(e.target.value).getTime())}
      ></PrimaryInput>
    </FormLayout>
  );
};

export default TaskItemForm;
