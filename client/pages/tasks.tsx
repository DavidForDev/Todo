import { useEffect, useState } from "react";

// ========== Layouts ========== \\
import PageContainer from "../layouts/page";

// ========== Redux ========== \\
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

// ========== Helper ========== \\
import { LoadingStatus } from "../hooks/loadingStatus";
import ContainerCards from "../components/taskCard";
import CheckTaskQuantity from "../components/404/checkTask";
import Search from "../components/search";
import TaskCardSkeleton from "../components/skeletons/taskCardSkeleton";

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState<object[]>([]);
  const [searchedResult, setSearchedResult] = useState<object[]>([]);

  // =========== Redux
  const taskSelector = useSelector((select: RootState) => select.account);

  useEffect(() => {
    if (searchValue === "") {
      setTasks(taskSelector.tasks);
      return setSearchedResult(taskSelector.tasks);
    }

    const filterTasks = tasks.filter((x: any) =>
      x.taskName.toLowerCase().includes(searchValue.toLowerCase())
    );

    setSearchedResult(filterTasks);
  }, [taskSelector.tasks, searchValue]);

  return (
    <PageContainer pageTitle="tasks">
      <div className="flex w-full flex-col h-full gap-5 overflow-auto">
        <Search searchValue={setSearchValue} />
        <CheckTaskQuantity
          data={tasks}
          searched={searchedResult}
          status={taskSelector.status}
        />
        <ContainerCards data={searchedResult} status={taskSelector.status} />
      </div>
    </PageContainer>
  );
};

export default TasksPage;
