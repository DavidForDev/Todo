// ========== Icons =========== \\
import AttachIcon from "../../public/icons/attach";

const AttachLink = ({ name }: { name: string }) => {
  return (
    <div className="flex items-start gap-1 cursor-pointer underline">
      <AttachIcon stroke="#98A2B3" />
      <a href={name} target="_blank" className="text-xs text-[#98A2B3]">
        {name}
      </a>
    </div>
  );
};

export default AttachLink;
