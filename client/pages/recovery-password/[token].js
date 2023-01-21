import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== Layout ========== \\
import AccountLayout from "../../layout/account.layout";

// ========== UIElement ========== \\
import { PrimaryInput } from "../../UIElements/ui.elements";

// ========== Contexts ========== \\
import { AccountContext } from "../../contexts/account.context";

export default function RecoveryPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const { recoveryPassword } = useContext(AccountContext);

  return (
    <AccountLayout
      title="recovery password"
      buttonTitle="Recovery"
      pQuestion="Do you have an account?"
      hrefName="Sign In"
      href="/sign-in"
      forgotPassword={false}
      buttonFunction={() =>
        recoveryPassword(newPassword, confirmPassword, token)
      }
    >
      <PrimaryInput
        type="password"
        placeholder="Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PrimaryInput
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AccountLayout>
  );
}

// this function gives us opportunity to control navigation and sideNavigation in the page
RecoveryPassword.appLayout = (page) => {
  return <main>{page}</main>;
};
