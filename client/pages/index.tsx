import { useContext, useState } from "react";
import Link from "next/link";

// =========== Components =========== \\
import Input from "../components/UIElements/input";
import { PrimaryButton } from "../components/UIElements";
import Alert from "../components/messageCard";

// =========== Redux =========== \\
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signIn } from "../redux/slices/account/thunks/user.thunks";

// =========== Context =========== \\
import { ErrorContext } from "../context/errors.context";

export default function Home() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const dispatch = useDispatch<AppDispatch>();

  // ========= Context
  const { makeError } = useContext(ErrorContext);

  const logIn = () => {
    const payload: any = {
      email: email,
      password: password,
    };

    if (email === "" || password === "")
      return makeError("please fill all fields");

    dispatch(signIn(payload));
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
      <Input
        type="password"
        placeholder="password"
        giveValue={setPassword}
        label="password"
      />
      <PrimaryButton className="justify-center" onClick={logIn}>
        Log in
      </PrimaryButton>
      <div className="w-full flex justify-between">
        <Link href="/sign-up" className="text-sm" prefetch={false}>
          sign Up
        </Link>
        <Link href="/forgot-password" className="text-sm" prefetch={false}>
          forgot Password?
        </Link>
      </div>
    </div>
  );
}
