import { useEffect, useRef } from "react";

// ========== Utils ========== \\
import ModalFun from "../utils/modalEngine";

const UseModal = ({ modalName, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    ModalFun(modalName, modalRef);
  }, []);

  return (
    <div
      className="z-50 fixed top-0 left-0 right-0 w-full h-full bg-black/25 hidden items-center justify-center"
      id={modalName}
    >
      <div
        ref={modalRef}
        className="bg-[#21212B] p-8 rounded-xl sm:w-1/3 w-11/12"
      >
        {children}
      </div>
    </div>
  );
};

export default UseModal;
