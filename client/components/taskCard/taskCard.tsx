import Image from "next/image";
import Link from "next/link";
import dateFormat from "dateformat";

// ========= Images ========== \\
import DefaultImage from "../../public/images/cardDefault.png";

// ========= Components ========== \\
import Tag from "./tag";

// ========= Types ========== \\
import { TaskCardTypes } from "../../types/type";

const TaskCard = ({ detail }: TaskCardTypes) => {
  const { tags, taskName, _id, createdAt } = detail;

  const dateNow = new Date(createdAt);
  const dateForm = dateFormat(dateNow, "mmmm d, yyyy");

  return (
    <Link href={`task/${_id}`}>
      <div className="group w-full p-2 pb-6 shadow-sm bg-white/70 cursor-pointer flex flex-col gap-3 rounded-lg backdrop-blur-xl">
        <div className="h-28 w-full">
          <Image
            src={DefaultImage}
            className="w-full h-full object-cover rounded-md group-hover:blur-[1px]"
            alt="Default"
          />
        </div>
        <div className="w-full flex flex-col px-2 gap-4">
          <div className="flex items-center gap-3 w-full">
            <div className="w-full">
              <div className="w-full flex items-start justify-between">
                <h3>{taskName}</h3>
              </div>
              <p className="text-[#56555C] text-xs">{dateForm}</p>
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {tags.map((detail: any, index: number) => {
              return <Tag detail={detail} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
