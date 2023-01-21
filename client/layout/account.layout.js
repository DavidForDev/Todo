import Link from "next/link";

import { PrimaryButton } from "../UIElements/ui.elements";

// ========== Layout ========== \\
import Header from "./head.layout";

const AccountLayout = ({
  title,
  buttonTitle,
  buttonFunction,
  pQuestion,
  hrefName,
  href,
  forgotPassword,
  children,
}) => {
  return (
    <>
      <Header pageTitle={title} />
      <div className="w-full h-full flex justify-center items-center p-3">
        <div className="max-w-xs w-full flex flex-col gap-14 items-center">
          <h3 className="text-4xl text-white">{title}.</h3>
          <form className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-3">{children}</div>
            <PrimaryButton type="button" onClick={buttonFunction}>
              {buttonTitle}
            </PrimaryButton>
            <div className="w-full text-center flex flex-col gap-3">
              <p className="text-base text-stone-300">
                {pQuestion}{" "}
                <Link href={`/${href}`} className="text-white">
                  {hrefName}
                </Link>
              </p>
              {forgotPassword && (
                <Link href="/forgot-password" className="text-white text-base">
                  Forgot Password?
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
