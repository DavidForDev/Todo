// ============ Icons ============= \\
import PlusIcon from "../../public/icons/plus";

const AddTaskCard = (props: any) => {
  return (
    <div
      {...props}
      className="hover:blur-[1px] w-full p-2 pb-6 shadow-sm bg-white/40 cursor-pointer flex flex-col items-center justify-center gap-3 rounded-lg backdrop-blur-xl"
    >
      <PlusIcon className="w-12" />
    </div>
  );
};

export default AddTaskCard;
