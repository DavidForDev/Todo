import { useContext, useState } from "react";

// =========== Icons ============ \\
import CalendarSvg from "../../public/icons/calendar";

// =========== UIElement ============ \\
import { CheckBox } from "../../UIElements/ui.elements";

// =========== Context ============ \\
import { toolsContext } from "../../contexts/tools.context";

// =========== layout ============ \\
import UseModal from "../../layout/useModal";

// =========== Components ============ \\
import TaskItemEditForm from "../forms/editor/taskItemEdit.form";

// =========== Helper ============ \\
import { dateEngine } from "../../helper/date.helper";

const TaskCard = ({ data }) => {
  const { _id, taskItemTitle, done, deadline } = data;
  const [check, setCheck] = useState(done ? JSON.parse(done) : false);
  const { markAsDone } = useContext(toolsContext);

  const checkAsDone = (checked, taskItemId) => {
    setCheck(checked);
    markAsDone(taskItemId);
  };

  // ====== Deadline ====== \\
  const isEarlyColor = "#B38148";
  const isAlreadyLate = "#fd5658";

  const { dateForm, nowDateTime } = dateEngine(deadline);

  const deadlineColorStatus =
    deadline === 0
      ? isEarlyColor
      : deadline > nowDateTime
      ? isEarlyColor
      : isAlreadyLate;

  return (
    <>
      <article
        className={`w-full bg-[#21212B] p-3 rounded-xl flex items-start gap-2 cursor-pointer ${
          check ? "opacity-25" : ""
        }`}
      >
        <CheckBox
          type="checkbox"
          onClick={(e) => checkAsDone(e.target.checked, _id)}
          defaultChecked={check}
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[#DEDEDF] break-all">{taskItemTitle}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CalendarSvg
                width="20px"
                height="20px"
                stroke={deadlineColorStatus}
              />
              <p className="text-sm" style={{ color: deadlineColorStatus }}>
                {deadline === 0 ? "no Deadline" : dateForm}
              </p>
            </div>
            <p
              className="text-white text-sm cursor-pointer hover:underline"
              aria-label={`#taskItemEditor${_id}`}
            >
              Edit
            </p>
          </div>
        </div>
      </article>
      <UseModal modalName={`taskItemEditor${_id}`}>
        <TaskItemEditForm data={data} />
      </UseModal>
    </>
  );
};

export default TaskCard;
