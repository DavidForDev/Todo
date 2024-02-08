import { useContext, useEffect } from "react";
import debounce from "lodash.debounce";

// =========== Components =========== \\
import { PrimaryButton } from "../../UIElements";

// =========== context =========== \\
import { modalContext } from "../../../context/modal.context";

// =========== Redux =========== \\
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { resetSuccess } from "../../../redux/slices/tasks/index.slice";

// =========== Helper =========== \\
import { ActionStatusEngine } from "../../../hooks/actionStatus";

// =========== Types =========== \\
import { ModalWrapperTypes } from "../../../types/type";

const Wrapper = ({ children, admitFunction, modalId }: ModalWrapperTypes) => {
  const { toggleModal } = useContext(modalContext);

  // ========== Redux
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((select: RootState) => select.task);

  // ========== Close modal if everything works fine
  useEffect((): any => {
    if (selector.actionStatus === "succesed")
      setTimeout(() => {
        toggleModal(modalId);
        dispatch(resetSuccess());
      }, 200);
  }, [selector.actionStatus, modalId, toggleModal, dispatch]);

  // ========== Prevent dubleClick
  const throttleFunction = async () => {
    if (typeof admitFunction !== "function") return;

    await debounce(admitFunction, 1000)();
  };

  const buttonsFilter =
    typeof admitFunction === "function" ? (
      <div className="flex items-center justify-end w-full gap-4">
        <PrimaryButton
          color="transparent"
          className="!text-black"
          onClick={() => toggleModal(modalId)}
        >
          Close
        </PrimaryButton>
        <PrimaryButton
          onClick={throttleFunction}
          className="shadow-sm !bg-gradient-to-r !from-red-500 !to-orange-500"
        >
          {ActionStatusEngine(selector.actionStatus)}
        </PrimaryButton>
      </div>
    ) : (
      ""
    );

  return (
    <div className="flex flex-col gap-6 h-full">
      {children}
      {buttonsFilter}
    </div>
  );
};

export default Wrapper;
