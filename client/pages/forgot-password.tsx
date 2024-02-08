import { useContext, useState } from "react";
import Link from "next/link";

// =========== Components =========== \\
import Input from "../components/UIElements/input";
import { PrimaryButton } from "../components/UIElements";
import Alert from "../components/messageCard";

// =========== Redux =========== \\
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { forgotPassword } from "../redux/slices/account/thunks/user.thunks";

// =========== Context =========== \\
import { ErrorContext } from "../context/errors.context";

const ForgotPassword = () => {
  const [email, setEmail] = useState<String>("");
  const dispatch = useDispatch<AppDispatch>();

  // ========= Context
  const { makeError } = useContext(ErrorContext);
  const selector = useSelector((select: RootState) => select.account);

  const passwordForgot = () => {
    const payload: any = {
      email: email,
    };

    if (email === "") return makeError("Please fill in all required fields");

    dispatch(forgotPassword(payload));
  };

  return (
    <div className="flex flex-col gap-3 w-80 m-auto h-full justify-center">
      <Alert />
      <Input
        type="text"
        placeholder="your email"
        giveValue={setEmail}
        label="email"
      />
      <PrimaryButton className="justify-center" onClick={passwordForgot}>
        {selector.actionStatus !== "idle" ? selector.actionStatus : "Send"}
      </PrimaryButton>
      <div className="w-full flex justify-between">
        <Link href="/" className="text-sm" prefetch={false}>
          sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
