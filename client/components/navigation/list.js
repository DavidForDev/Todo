import Link from "next/link";

const List = ({ data }) => {
  return (
    <Link
      href={data.href}
      className="w-full p-4 flex items-center gap-2 cursor-pointer"
    >
      {data.svg}
      <p className="text-white text-sm">{data.name}</p>
    </Link>
  );
};

export default List;
