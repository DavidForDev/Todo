const List = ({ data, taskId }) => {
  return (
    <li
      className={`flex px-5 w-full items-center gap-4 py-5 hover:bg-white/20 cursor-pointer ${
        taskId === data._id ? "bg-white/20" : ""
      }`}
    >
      <div
        className="p-4 rounded-lg"
        style={{ background: data.collectionColor }}
      ></div>
      <p className="text-white text-base font-normal">{data.collectionTitle}</p>
    </li>
  );
};

export default List;
