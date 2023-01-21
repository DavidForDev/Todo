import { useContext, useState } from "react";

// ========== Layout ========== \\
import AccountLayout from "../layout/account.layout";

import { PrimaryInput } from "../UIElements/ui.elements";

// ========== Contexts ========== \\
import { AccountContext } from "../contexts/account.context";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { forgotPassword } = useContext(AccountContext);

  return (
    <AccountLayout
      title="Forgot password"
      buttonTitle="Send Recovery Request"
      pQuestion="Do you have an account?"
      hrefName="Sign In"
      href="/sign-in"
      forgotPassword={false}
      buttonFunction={() => forgotPassword(email)}
    >
      <PrimaryInput
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </AccountLayout>
  );
}

// this function gives us opportunity to control navigation and sideNavigation in the page
ForgotPassword.appLayout = (page) => {
  return <main>{page}</main>;
};
