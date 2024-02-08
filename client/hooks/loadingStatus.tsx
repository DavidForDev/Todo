import { ReactNode } from "react";
import Image from "next/image";

// ============ Gifs ============ \\
import loader from "../public/gifs/loader.gif";
import Loading2 from "../public/gifs/loading2.gif";

export const LoadingStatus = (
  children?: ReactNode,
  selector?: any,
  animationStyle?: string
) => {
  const status: any = selector;

  const loaderType = () => {
    if (animationStyle && animationStyle === "text") {
      return <Image src={Loading2} alt="Loading" width={50} height={50} />;
    }

    return (
      <div className="z-50 left-0 top-0 fixed w-full h-full duration-150 bg-white/20 flex justify-center items-center color-black backdrop-blur-xl ">
        <Image src={loader} alt="loading" />
      </div>
    );
  };

  if (status !== "success")
    return (
      <div className="w-full flex justify-center items-center">
        {loaderType()}
      </div>
    );

  return children;
};
