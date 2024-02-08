import { DragEvent } from "react";

// =========== Components ========== \\
import TaskItemCard from "./taskItemCard";

// =========== Helper ========== \\
import { LoadingStatus } from "../../hooks/loadingStatus";

// ========== Redux =========== \\
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { changeItemStatus } from "../../redux/slices/tasks/thunks/task.thunk";

const TaskList = ({ listName, data, selector, giveData }: any) => {
  // ========== Redux
  const dispatch = useDispatch<AppDispatch>();

  const dataResult = data?.[listName]?.map((detail: any, index: number) => {
    return <TaskItemCard key={index} detail={detail} />;
  });

  // =============== drag / drop Function
  const endDragHandle = (event: DragEvent) => {
    const newItem = JSON.parse(event.dataTransfer.getData("itemCard"));
    const target = event.target as HTMLElement;
    const targetStatus = target.id;

    let oldItem = { ...data };

    // =========== Remove Target Item from old position && set item on new position
    const newItemUpdate = { ...newItem, status: targetStatus };

    if (!targetStatus || newItem.status === targetStatus) return;

    oldItem = {
      ...oldItem,
      [newItem.status]: oldItem[newItem.status].filter(
        (x: any) => JSON.stringify(x) !== JSON.stringify(newItem)
      ),
      [targetStatus]: [...oldItem[targetStatus], newItemUpdate],
    };

    // ============ Send updated Data to server
    const payload = {
      taskItemId: newItem._id,
      newStatus: targetStatus,
    };
    dispatch(changeItemStatus(payload));

    // =========== Change useState
    giveData(oldItem);
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  return (
    <section
      className="flex flex-col gap-8 h-full overflow-auto p-1"
      onDragOver={onDragOver}
      onDrop={endDragHandle}
      id={listName}
    >
      <h3 className="text-xs text-[#667085] font-bold uppercase sticky top-2 w-full">
        {listName}
      </h3>
      <div className="flex flex-col gap-6">
        {LoadingStatus(dataResult, selector.status.specialTaskThunk, "notext")}
      </div>
    </section>
  );
};

export default TaskList;
