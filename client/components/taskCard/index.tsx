import { useContext } from "react";

// ========== Context ========== \\
import { modalContext } from "../../context/modal.context";

// =========== Components ============= //
import TaskCardSkeleton from "../skeletons/taskCardSkeleton";
import AddTaskCard from "./addTaskCard";
import TaskCard from "./taskCard";

const ContainerCards = ({ data, status }: any) => {
  const { toggleModal } = useContext(modalContext);

  return (
    <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 relative">
      {status === "loading" ? (
        <TaskCardSkeleton quantity={10} />
      ) : (
        data.map((detail: any, index: number) => {
          return <TaskCard detail={detail} key={index} />;
        })
      )}
      <AddTaskCard onClick={() => toggleModal("taskcreator")} />
    </div>
  );
};

export default ContainerCards;
