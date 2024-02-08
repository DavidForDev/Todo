import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TaskCardSkeleton = ({ quantity }: any) => {
  return Array(quantity)
    .fill("")
    .map((_, index) => {
      return (
        <div
          key={index}
          className="group animate-pulse w-full p-2 pb-6 shadow-sm bg-white/70 cursor-pointer flex flex-col gap-3 rounded-lg backdrop-blur-xl"
        >
          <div className="h-28 w-full">
            <div className="w-full bg-gray-200 h-full object-cover rounded-md group-hover:blur-[1px]" />
          </div>
          <div className="w-full flex flex-col px-2 gap-4">
            <div className="flex items-center gap-3 w-full">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-start justify-between">
                  <div className="bg-gray-200 w-full py-2"></div>
                </div>
                <p className="text-[#56555C] text-xs">
                  <div className="bg-gray-200 w-20 py-2"></div>
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="bg-gray-200 w-full py-3 rounded-md"></div>
              <div className="bg-gray-200 w-full py-3 rounded-md"></div>
              <div className="bg-gray-200 w-full py-3 rounded-md"></div>
            </div>
          </div>
        </div>
      );
    });
};

export default TaskCardSkeleton;
