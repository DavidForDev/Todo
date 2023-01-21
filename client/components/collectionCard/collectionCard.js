import { useEffect, useState } from "react";

// ========== Icons ========== \\
import Precentage from "../../public/icons/precentageCircle";

const CollectionCard = ({ data }) => {
  const { collectionTitle, collectionColor, donePrecent, doneString } = data;

  return (
    <article className="flex flex-col items-start gap-9 w-full bg-[#21212B] p-4 rounded-2xl cursor-pointer">
      <div className="flex items-start justify-between w-full">
        <div
          className="p-6 rounded-2xl"
          style={{ background: collectionColor }}
        ></div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-white text-xl">{collectionTitle}</h3>
        <div className="flex justify-between items-center w-full">
          <span className="text-[#818186] text-sm">{doneString} done</span>
          <Precentage
            width="20"
            height="20"
            precent={donePrecent}
            color={collectionColor}
          />
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
