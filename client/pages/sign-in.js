import { useContext, useState } from "react";

// ========== Layout ========== \\
import AccountLayout from "../layout/account.layout";

// ========== UIElemnet ========== \\
import { PrimaryInput } from "../UIElements/ui.elements";

// ========== Context ========== \\
import { AccountContext } from "../contexts/account.context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AccountContext);

  return (
    <AccountLayout
      title="Sign In"
      buttonTitle="Sign In"
      pQuestion="Dont have an account?"
      hrefName="Create Account"
      href="sign-up"
      forgotPassword={true}
      buttonFunction={() => signIn(email, password)}
    >
      <PrimaryInput
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PrimaryInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </AccountLayout>
  );
}

// this function gives us opportunity to control navigation and sideNavigation in the page
SignIn.appLayout = (page) => {
  return <main>{page}</main>;
};
