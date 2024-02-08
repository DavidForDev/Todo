import Wrapper from "../wrapper.form";
import { useRouter } from "next/router";

// ========== Components ========== \\
import Question from "../question";

// ========== Redux ========== \\
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../../../../redux/slices/tasks/thunks/task.thunk";

const RemoveTaskForm = ({ modalId }: { modalId: string }) => {
  // ======== Query
  const router = useRouter();
  const { taskId }: any = router.query;

  // ======== Redux
  const dispatch = useDispatch<AppDispatch>();
  const userSelector = useSelector((select: RootState) => select.task);

  const { author } = userSelector?.specialTask;

  const removeTaskHandle = () => {
    const payload: any = {
      taskId: taskId,
      userId: author._id,
    };
    dispatch(removeTask(payload));
  };

  return (
    <Wrapper admitFunction={removeTaskHandle} modalId={modalId}>
      <Question question="do you want to remove this task?" />
    </Wrapper>
  );
};

export default RemoveTaskForm;
