// ========== Components ========== \\
import TaskCard from "./taskCard";
import TaskItemForm from "../forms/creator/taskItemCreator.form";
import TasksEditForm from "../forms/editor/tasksEdit.form";

// ========== Layout ========== \\
import UseModal from "../../layout/useModal";

// =========== Icons ============ \\
import EditPencilSvg from "../../public/icons/editPencil";
import PlusSvg from "../../public/icons/plus";

// =========== UIElement ============ \\
import { SecondaryButton } from "../../UIElements/ui.elements";

const Task = ({ data }) => {
  const { tasksTitle, tasksItems, _id } = data;
  return (
    <>
      <div className={`flex flex-col gap-3 overflow-auto`}>
        <div className="flex justify-between w-full">
          <h3 className="text-white text-base font-semibold">{tasksTitle}</h3>
          <EditPencilSvg
            width="22px"
            height="22px"
            aria-label={`#editTasks${_id}`}
          />
        </div>
        <section className="flex flex-col gap-3">
          {tasksItems.map((el, index) => {
            return <TaskCard key={index} data={el} />;
          })}
          <SecondaryButton
            className="opacity-60 hover:opacity-100"
            aria-label={`#createTaskItem${_id}`}
          >
            <PlusSvg />
          </SecondaryButton>
        </section>
        <UseModal modalName={`createTaskItem${_id}`}>
          <TaskItemForm data={data} />
        </UseModal>
        <UseModal modalName={`editTasks${_id}`}>
          <TasksEditForm data={data} />
        </UseModal>
      </div>
    </>
  );
};

export default Task;
