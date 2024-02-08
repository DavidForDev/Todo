// =========== Icons ========= \\
import LoadingSvg from "../public/icons/loading";

export const ActionStatusEngine = (status: string) => {
  if (status === "idle") {
    return "admit";
  } else if (status === "processing...") {
    return (
      <>
        <LoadingSvg />
        <p>{status}</p>
      </>
    );
  }

  return "admit";
};
