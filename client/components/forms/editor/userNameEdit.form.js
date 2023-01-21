import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput, SecondaryButton } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// =========== Contexts ============ \\
import { AccountContext } from "../../../contexts/account.context";

const UserNameEditForm = ({ username }) => {
  const [userName, setUserName] = useState("");
  const { changeUserName, id } = useContext(AccountContext);
  const router = useRouter();

  return (
    <FormLayout
      admitFunction={async () => {
        await changeUserName(id, userName);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        defaultValue={username}
        onChange={(e) => setUserName(e.target.value)}
      />
    </FormLayout>
  );
};

export default UserNameEditForm;
