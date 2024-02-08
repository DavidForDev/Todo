// ========== Icons ========== \\
import CloseIcon from "../../public/icons/close";

// ========== Types ========== \\
import { TagTypes } from "../../types/type";

const Tag = ({ detail, removeFunction }: TagTypes) => {
  const { color, name } = detail;

  // ======== Check if removeFunction exist
  const closerFilter = removeFunction && <CloseIcon onClick={removeFunction} />;

  return (
    <div
      className="py-1.5 px-3 rounded-2xl flex items-center gap-3"
      style={{ backgroundColor: `${color}30` }}
    >
      <p
        className="text-xs font-bold first-letter:uppercase text-ellipsis whitespace-nowrap overflow-hidden max-w-xs"
        style={{ color: `${color}` }}
      >
        {name}
      </p>
      {closerFilter}
    </div>
  );
};

export default Tag;
