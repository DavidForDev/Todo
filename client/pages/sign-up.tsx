import { useContext, useState } from "react";
import Link from "next/link";

// ========== Redux ============ \\
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signUp } from "../redux/slices/account/thunks/user.thunks";

// =========== Components =========== \\
import Input from "../components/UIElements/input";
import { PrimaryButton } from "../components/UIElements";
import Alert from "../components/messageCard/index";

// =========== Context =========== \\
import { ErrorContext } from "../context/errors.context";

const LoginUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // ========== Context
  const { makeError } = useContext(ErrorContext);

  const dispatch = useDispatch<AppDispatch>();

  const createAccount = () => {
    const payload: any = {
      email: email,
      password: password,
      userName: userName,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailRegex.test(email);

    if (!checkEmail) return makeError("email format is wrong!");

    if (email === "" || password === "" || userName === "")
      return makeError("Please fill in all required fields");

    if (password.length < 8)
      return makeError("Password must contain 8 characters");

    dispatch(signUp(payload));
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
        type="text"
        placeholder="userName"
        giveValue={setUserName}
        label="username"
      />
      <Input
        type="password"
        placeholder="password"
        giveValue={setPassword}
        label="password"
      />
      <PrimaryButton className="justify-center" onClick={createAccount}>
        Sign up
      </PrimaryButton>
      <div className="w-full flex justify-between">
        <Link href="/" className="text-sm" prefetch={false}>
          sign In
        </Link>
      </div>
    </div>
  );
};

export default LoginUp;
