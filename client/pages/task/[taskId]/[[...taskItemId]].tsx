import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ========== Layouts ========== \\
import PageLayout from "../../../layouts/page";

// ========== Components ========== \\
import TaskList from "../../../components/taskList";

// ========== Redux ========== \\
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { specialTask } from "../../../redux/slices/tasks/thunks/task.thunk";

const Task = () => {
  const [taskItem, setTaskItem] = useState<any>();

  // =========== Redux
  const dispatch = useDispatch<AppDispatch>();
  const specialSelector = useSelector((select: RootState) => select.task);

  const { taskItems, taskName } = specialSelector?.specialTask;

  // ====== Params
  const router = useRouter();
  const { taskId }: any = router.query;

  useEffect(() => {
    if (!taskId) return;

    dispatch(specialTask(taskId));
  }, [taskId, dispatch]);

  useEffect(() => {
    setTaskItem(taskItems);
  }, [specialSelector.specialTask, taskItems]);

  return (
    <PageLayout pageTitle={taskName ? taskName : "Task Page"}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 w-11/12 m-auto overflow-auto h-full">
        <TaskList
          listName="todo"
          data={taskItem}
          selector={specialSelector}
          giveData={setTaskItem}
        />
        <TaskList
          listName="doing"
          data={taskItem}
          selector={specialSelector}
          giveData={setTaskItem}
        />
        <TaskList
          listName="done"
          data={taskItem}
          selector={specialSelector}
          giveData={setTaskItem}
        />
      </div>
    </PageLayout>
  );
};

export default Task;
