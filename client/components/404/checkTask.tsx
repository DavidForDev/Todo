import Image from "next/image";

// ========= Images ========== \\
import emptyImage from "../../public/images/empty.png";
import notFoundImage from "../../public/images/notFound.png";

const CheckTaskQuantity = ({ data, searched, status }: any) => {
  if (status === "success" && Array.isArray(data) && data.length === 0)
    return (
      <div className="py-4 flex justify-center items-center flex-col w-full gap-2">
        <Image src={emptyImage} alt="empty" width={100} height={100} />
        <h3 className="capitalize text-2xl opacity-70">
          you don&apos;t have any tasks
        </h3>
      </div>
    );

  if (
    status === "success" &&
    Array.isArray(searched) &&
    searched.length === 0 &&
    data.length > 0
  )
    return (
      <div className="py-4 flex justify-center items-center flex-col w-full gap-2">
        <Image src={notFoundImage} alt="empty" width={100} height={100} />
        <h3 className="capitalize text-2xl opacity-70">
          We can&apos;t find any such tasks
        </h3>
      </div>
    );
};

export default CheckTaskQuantity;
