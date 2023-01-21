import { useContext, useState } from "react";

// ========== Layout ========== \\
import AccountLayout from "../layout/account.layout";

// ========== UIElemnet ========== \\
import { PrimaryInput } from "../UIElements/ui.elements";

// ========== context ========== \\
import { AccountContext } from "../contexts/account.context";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useContext(AccountContext);

  return (
    <AccountLayout
      title="Sign Up"
      buttonTitle="Sign Up"
      pQuestion="Do you have an account?"
      hrefName="Sign In"
      href="/sign-in"
      forgotPassword={true}
      buttonFunction={() => signUp(userName, email, password)}
    >
      <PrimaryInput
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />
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
SignUp.appLayout = (page) => {
  return <main>{page}</main>;
};
