import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dateFormat from "dateformat";

// =========== Components =========== \\
import Wrapper from "../wrapper.form";
import AttachLink from "../../../attachLink";

// =========== redux =========== \\
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

// =========== Context =========== \\
import { modalContext } from "../../../../context/modal.context";

// =========== Helper =========== \\
import { LoadingStatus } from "../../../../hooks/loadingStatus";

const TaskItemDetail = () => {
  const [taskItemDetail, setTaskItemDetail] = useState<Object>({});

  // =========== Router
  const router = useRouter();
  const { taskItemId }: any = router.query;

  // =========== Context
  const { toggleModal } = useContext(modalContext);

  // =========== Redux
  const taskItemSelector = useSelector((select: RootState) => select.task);

  const { status, taskItemName, description, createdAt, attach, author }: any =
    taskItemDetail;

  // ========== Date formater
  const dateNow: any = createdAt !== undefined ? new Date(createdAt) : "";
  const dateForm = dateFormat(dateNow, "dddd, dS mmmm, yyyy");

  // =========== Filter Task Item Detail
  useEffect(() => {
    if (!taskItemSelector.specialTask.taskItems || !taskItemId) return;

    const secitonNames = ["todo", "doing", "done"];

    for (let i = 0; i < secitonNames.length; i++) {
      const accrodingToStatus = secitonNames[i];

      const result = taskItemSelector.specialTask.taskItems[
        accrodingToStatus
      ].find((x: any) => x._id === taskItemId[0]);

      if (result) return setTaskItemDetail(result);
    }
  }, [taskItemDetail, taskItemSelector.specialTask.taskItems, taskItemId]);

  /// ========= Attachments
  const attachmentResult = attach?.map((el: any, index: number) => {
    return <AttachLink name={el.name} key={index} />;
  });

  return (
    <Wrapper modalId="">
      <div className="w-full h-full overflow-auto">
        <div className="w-full border-b border-solid border-[#f1f1f5] pb-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span
                className="first-letter:uppercase text-xs text-[#8c939a] font-semibold underline cursor-pointer"
                onClick={() => toggleModal("taskStatusEditor")}
              >
                status:{" "}
                {LoadingStatus(
                  status,
                  taskItemSelector.status.specialTaskThunk,
                  "text"
                )}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl first-letter:uppercase font-bold">
                  {LoadingStatus(
                    taskItemName,
                    taskItemSelector.status.specialTaskThunk,
                    "text"
                  )}
                </h3>
                <p className="first-letter:uppercase text-xs font-medium text-[#8c939a]">
                  added by {author?.userName}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span className="uppercase text-xs text-[#8c939a] font-semibold">
                created date
              </span>
              <p className="text-sm text-[#44444f]">{dateForm}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 border-b border-solid border-[#f1f1f5] py-8 h-72">
          <h3 className=" text-xs font-bold uppercase tracking-wide">
            description
          </h3>
          <p className="text-xs text-[#8c939a] leading-5 overflow-auto max-h-max">
            {LoadingStatus(
              description,
              taskItemSelector.status.specialTaskThunk,
              "text"
            )}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 justify-between border-b border-solid border-[#f1f1f5] py-8">
          <h3 className="text-xs font-bold uppercase tracking-wide">
            attachments
          </h3>
          <div className="flex flex-col gap-3">
            {LoadingStatus(
              attachmentResult,
              taskItemSelector.status.specialTaskThunk,
              "text"
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default TaskItemDetail;
