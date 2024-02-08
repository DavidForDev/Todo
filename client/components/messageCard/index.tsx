import { useContext, useEffect, useState } from "react";

// =========== Context ========== \\
import { ErrorContext } from "../../context/errors.context";

// =========== Component ========== \\
import MessageCard from "./card";

const Alert = () => {
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  // ========= Context
  const { errors } = useContext(ErrorContext);

  useEffect(() => {
    if (errors.length !== 0) {
      setAlertStatus(true);
      setTimeout(() => {
        setAlertStatus(false);
      }, 4000);
    }
  }, [errors]);

  return (
    <div
      className="absolute bottom-5 right-7 z-50"
      style={{ display: alertStatus ? "block" : "none" }}
    >
      {errors.map((el: any, index: number) => {
        return <MessageCard key={index} message={el} messageType="error" />;
      })}
    </div>
  );
};

export default Alert;
