const MoreDetail = ({ data }: { data: object[] }) => {
  return (
    <div className="p-1 max-w-xs shadow-2xl bg-white absolute top-6 right-0 flex flex-col gap-2 border border-solid border-black/5">
      {data.map((el: any, index: number) => {
        return (
          <div
            key={index}
            className="flex gap-1.5 px-2 py-1 hover:bg-[#F2F4F7] cursor-pointer"
            onClick={el.function}
          >
            {el.svg} <p className="text-sm">{el.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MoreDetail;
