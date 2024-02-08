import { useContext, useState } from "react";

// ========== Components ========== \\
import Alert from "../messageCard";
import MoreDetail from "../moreDetail";

// ========== Icons ========== \\
import CloseIcon from "../../public/icons/close";
import MoreIcon from "../../public/icons/more";

// ========== Helper ========== \\
import { GiveChildrenProp } from "../../hooks/childrenProp";

// ========== Context ========== \\
import { modalContext } from "../../context/modal.context";
import { useRouter } from "next/router";

// ========== Types ========== \\
import { ModalTypes } from "../../types/type";

const Modal = ({ detail }: ModalTypes) => {
  const { id, name, content, visibleStatus, rightSide, leftSide, more } =
    detail;
  const [moreItem, setMoreItem] = useState<boolean>(false);

  const { toggleModal } = useContext(modalContext);

  // ======== router
  const router = useRouter();
  const { taskId, taskItemId } = router.query;

  // ======== Modal Closer Funciton
  const closerHandle = () => {
    if (Boolean(taskItemId)) {
      // ============== this gives us opportunity to remove extra params when we open taskItem Detail Modal
      router.replace("/task/[taskId]/[taskItemId]", `/task/${taskId}`);
    } else {
      // ============== but we don't have "taskItemId" params on another page and in such
      // situation we use just closer function
      toggleModal(id);
    }
  };

  if (!visibleStatus) return null;

  // ============ If modals needs leftSide Layout
  const leftSideStyle = {
    containerPosition: "left-0 top-0 h-full",
  };

  // ============ If modals needs rightSide Layout
  const rightSideStyle = {
    containerPosition: "right-0 top-0 h-full",
  };

  // ============ here we filter sides styles to use appropriate styles \\ center Side is default
  const filterSidesStyle = rightSide
    ? rightSideStyle.containerPosition
    : leftSide
    ? leftSideStyle.containerPosition
    : "";

  // =========== "More" Filter
  const moreFilter: Function = () => {
    if (more && more.length > 0) {
      return (
        <div className="relative">
          <MoreIcon onClick={() => setMoreItem(!moreItem)} />
          {moreItem ? <MoreDetail data={more} /> : ""}
        </div>
      );
    }
  };

  // ============ and finally we use filterSideStyle with default styles which is important anyway
  const FinallymodalStyle = `
  absolute 
  bg-white
  rounded-none 
  w-full
  lg:w-5/12
  lg:rounded-lg 
  flex 
  flex-col 
  gap-2 ${filterSidesStyle}
    `;

  return (
    <div className="absolute w-full h-full justify-center flex items-center z-30">
      <Alert />
      <div className="top-0 left-0 fixed w-full h-full bg-black/20"></div>
      <div className={FinallymodalStyle}>
        <div className="flex items-center justify-between border-b border-solid border-[#e4e4eb] px-5 py-2">
          <h3 className="capitalize text-xl font-medium">{name}</h3>
          <div className="flex items-center gap-3">
            {moreFilter()}
            <CloseIcon onClick={closerHandle} />
          </div>
        </div>
        <div className="px-5 py-3">
          {GiveChildrenProp(content, { modalId: id })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
