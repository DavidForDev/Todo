import React, { useState, DragEvent } from "react";
import { useRouter } from "next/router";
import dateFormat from "dateformat";

// =========== Components ========== \\
import AttachLink from "../attachLink";

// =========== Helper ========== \\
import { textLimiter } from "../../hooks/textLimit";

// =========== Icons ========== \\
import DragIcon from "../../public/icons/drag";
import { AttachTypes, TaskItemCardTypes } from "../../types/type";

const TaskItemCard = ({ detail }: TaskItemCardTypes) => {
  const [dragStatus, setDragStatus] = useState<boolean>(false);

  const router = useRouter();
  const { taskId } = router.query;

  // ============ Card Detail
  const { _id, taskItemName, description, attach, author, createdAt } = detail;
  const { userName } = author;

  // ========== Date ========== \\
  const now = new Date(createdAt);
  const date = dateFormat(now, "dS mmmm");

  // ============= Open detail Card
  const articleHandle = () => {
    router.replace("/task/[taskId]/taskItemId", `/task/${taskId}/${_id}`);
  };

  // ========== Dragable Fuctions ========== \\
  const startDragHandle = (event: DragEvent) => {
    event.dataTransfer.setData("itemCard", JSON.stringify(detail));

    const currentTarget = event.currentTarget as HTMLElement;
    currentTarget.style.visibility = "hidden";

    setDragStatus(!dragStatus);
    event.stopPropagation();
  };

  const endDragHandle = (event: DragEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;
    currentTarget.style.visibility = "visible";

    setDragStatus(!dragStatus);
  };

  return (
    <article
      onDragStart={startDragHandle}
      onDragEnd={endDragHandle}
      onClick={articleHandle}
      draggable
      className="bg-white/70 transition-all duration-150 select-none active:cursor-grabbing cursor-pointer backdrop-blur-xl p-5 shadow-sm rounded-lg flex flex-col gap-4"
      style={{ opacity: dragStatus ? "0.3" : "1" }}
    >
      <div className="flex flex-col gap-1">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#1D2939]">{taskItemName}</h3>
          <DragIcon className="cursor-grab active:cursor-grabbing opacity-75" />
        </div>
        <p className="text-[#C4C4C4] text-xs ">
          {date} <span>•</span> Created by{" "}
          <span className="text-[#667085]">{userName}</span>
        </p>
      </div>
      <div>
        <p className="text-[#98A2B3] text-xs leading-5">
          {textLimiter(description, 150)}
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {attach.slice(0, 2).map((detail: AttachTypes, index: number) => {
          const name: string = textLimiter(detail.name, 12);
          return <AttachLink name={name} key={index} />;
        })}
      </div>
    </article>
  );
};

export default TaskItemCard;
