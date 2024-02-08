// =========== Components ========== \\
import { InputDiv } from ".";

// =========== Types ========== \\
import { FormWrapperTypes } from "../../types/type";

const Wrapper = ({ children, label, requireSign }: FormWrapperTypes) => {
  const require = requireSign && (
    <span className="text-[#ED0131] font-bold">*</span>
  );

  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-sm text-[#4F4F4F] capitalize">
        {label} {require}
      </label>
      {children}
    </div>
  );
};

export default Wrapper;
