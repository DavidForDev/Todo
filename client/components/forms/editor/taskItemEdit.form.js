import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import {
  PrimaryInput,
  PrimaryTextArea,
  SecondaryButton,
} from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// ========== Contexts ========= \\
import { toolsContext } from "../../../contexts/tools.context";

// ========== Helper ========= \\
import { dateEngine } from "../../../helper/date.helper";

const TaskItemEditForm = ({ data }) => {
  const [taskItemTitle, setTaskItemTitle] = useState(data.taskItemTitle);
  const [taskDeadline, setTaskDeadline] = useState(data.deadline);
  const { editTaskItem, removeTaskItem } = useContext(toolsContext);
  const router = useRouter();

  // =========== Date Enginge =========== \\
  const { day, month, year } = dateEngine();
  const dateForm = year + "-" + month + "-" + day;

  return (
    <FormLayout
      admitButtonName="Edit Task"
      admitFunction={async () => {
        await (data._id, taskItemTitle, taskDeadline);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryTextArea
        type="text"
        defaultValue={taskItemTitle}
        onChange={(e) => setTaskItemTitle(e.target.value)}
        className="whitespace-pre-wrap"
      />
      <PrimaryInput
        type="date"
        min={dateForm}
        onChange={(e) => setTaskDeadline(new Date(e.target.value).getTime())}
      ></PrimaryInput>
      <SecondaryButton
        type="button"
        onClick={async () => {
          await removeTaskItem(data._id);
          await router.replace(router.asPath);
        }}
      >
        Remove Task Item
      </SecondaryButton>
    </FormLayout>
  );
};

export default TaskItemEditForm;
