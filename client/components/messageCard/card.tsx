// =========== Icon ========== \\
import ErrorIcon from "../../public/icons/error";
import SuccessIcon from "../../public/icons/success";

// =========== Types ========== \\
import { MessageCardTypes } from "../../types/type";

const MessageCard = ({ message, messageType }: MessageCardTypes) => {
  const filterMessageType =
    messageType.toLowerCase() === "error" ? (
      <ErrorIcon stroke="#b3312f" />
    ) : (
      <SuccessIcon />
    );

  return (
    <div className="flex py-2 px-3 rounded-lg items-center justify-between bg-[#edc8c5] border border-solid border-[#b3312f]">
      <div className="flex items-center gap-3">
        {filterMessageType}
        <h3 className="text-[#b3312f] font-medium text-sm">{message}</h3>
      </div>
    </div>
  );
};

export default MessageCard;
