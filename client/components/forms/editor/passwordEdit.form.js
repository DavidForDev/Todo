import { useContext, useState } from "react";

// ========== UIElement ========= \\
import { PrimaryInput, SecondaryButton } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// =========== Contexts ============ \\
import { AccountContext } from "../../../contexts/account.context";

const PasswordEditForm = () => {
  const [password, setPassword] = useState("");
  const { changePassword, id } = useContext(AccountContext);

  return (
    <FormLayout admitFunction={() => changePassword(id, password)}>
      <PrimaryInput
        type="password"
        placeholder="new Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </FormLayout>
  );
};

export default PasswordEditForm;
