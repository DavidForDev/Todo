import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// =========== Components =========== \\
import Input from "../../components/UIElements/input";
import { PrimaryButton } from "../../components/UIElements";
import Alert from "../../components/messageCard";

// =========== Redux =========== \\
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { recoveryPassword } from "../../redux/slices/account/thunks/user.thunks";

// =========== Context =========== \\
import { ErrorContext } from "../../context/errors.context";

const RecoveryPassword = () => {
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const dispatch = useDispatch<AppDispatch>();

  // ========== Context
  const { makeError } = useContext(ErrorContext);

  // ========== Redux
  const selector = useSelector((select: RootState) => select.account);

  const router = useRouter();
  const { token } = router.query;

  const passwordRecovery = () => {
    const payload: any = {
      newPassword: password,
      repeatPassword: confirmPassword,
      token: token,
    };

    if (!token) return makeError("Something is wrong with the token");

    if (password === "" || confirmPassword === "")
      return makeError("Please fill in all required fields");

    dispatch(recoveryPassword(payload));
  };

  return (
    <div className="flex flex-col gap-3 w-80 m-auto h-full justify-center">
      <Alert />
      <Input
        type="password"
        placeholder="new Password"
        giveValue={setPassword}
        label="new password"
      />
      <Input
        type="password"
        placeholder="repeat password"
        giveValue={setConfirmPassword}
        label="repeat password"
      />
      <PrimaryButton className="justify-center" onClick={passwordRecovery}>
        {selector.actionStatus !== "idle"
          ? selector.actionStatus
          : "Recovery Password"}
      </PrimaryButton>
      <div className="w-full flex justify-between">
        <Link href="/" className="text-sm" prefetch={false}>
          sign In
        </Link>
      </div>
    </div>
  );
};

export default RecoveryPassword;
