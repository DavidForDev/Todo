import Wrapper from "../wrapper.form";
import { useRouter } from "next/router";

// ========== Components ========== \\
import Question from "../question";

// ========== Redux ========== \\
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { removeTaskItem } from "../../../../redux/slices/tasks/thunks/task.thunk";

const RemoveTaskItemForm = ({ modalId }: { modalId?: string }) => {
  // ======== Query
  const router = useRouter();
  const { taskItemId, taskId }: any = router.query;

  // ======== Redux
  const dispatch = useDispatch<AppDispatch>();

  const removeTaskHandle = () => {
    const payload: any = taskItemId;

    dispatch(removeTaskItem(payload));

    router.replace("/task/[taskId]/[taskItemId]", `/task/${taskId}`);
  };

  return (
    <Wrapper admitFunction={removeTaskHandle} modalId={modalId}>
      <Question question="do you want to remove this task Item?" />
    </Wrapper>
  );
};

export default RemoveTaskItemForm;
