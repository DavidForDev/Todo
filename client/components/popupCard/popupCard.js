import { useState } from "react";

const PopupCard = ({ openStatus, cardStatus, message, setMessage }) => {
  const [openCard, setOpenCard] = useState(openStatus);

  // ========= Closer ========= \\
  const closerPopup = () => {
    setOpenCard(false);
    setMessage({
      type: "",
      message: "",
    });
  };

  // ========= Close after X time ========= \\
  if (openCard) {
    setTimeout(() => {
      closerPopup();
    }, 4000);
  }

  // ========= Generate container Color ========= \\
  const success = "#4edb6a33";
  const error = "#fd56584d";

  const generateCardStatus =
    cardStatus === "success" ? success : cardStatus === "error" ? error : "";

  // ========= Generate which title use ========= \\
  const generateCardTitle =
    cardStatus === "success"
      ? "Congratulations!"
      : cardStatus === "error"
      ? "Something Wrong!"
      : "";

  return (
    <div
      className={`absolute ${
        openCard ? "flex" : "hidden"
      } items-center justify-between max-w-xs w-full right-8 bottom-8 p-3 rounded-xl border-2 border-solid`}
      style={{
        background: generateCardStatus,
        borderColor: generateCardStatus,
      }}
    >
      <div>
        <h3 className="text-white">{generateCardTitle}</h3>
        <p className="text-white/60 text-sm">{message}</p>
      </div>
      <span
        className="text-2xl text-white cursor-pointer"
        onClick={closerPopup}
      >
        &times;
      </span>
    </div>
  );
};

export default PopupCard;
