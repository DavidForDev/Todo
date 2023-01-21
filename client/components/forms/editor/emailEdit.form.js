import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// =========== Contexts ============ \\
import { AccountContext } from "../../../contexts/account.context";

const EmailEditForm = ({ userEmail }) => {
  const [email, setEmail] = useState("");
  const { changeUserEmail, id } = useContext(AccountContext);
  const router = useRouter();

  return (
    <FormLayout
      admitFunction={async () => {
        await changeUserEmail(id, email);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        defaultValue={userEmail}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormLayout>
  );
};

export default EmailEditForm;
