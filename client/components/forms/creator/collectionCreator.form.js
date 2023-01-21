import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// ========== Contexts ========= \\
import { toolsContext } from "../../../contexts/tools.context";
import { AccountContext } from "../../../contexts/account.context";

const CollectionForm = () => {
  const { createCollection } = useContext(toolsContext);
  const { id } = useContext(AccountContext);
  const router = useRouter();

  const [collectionColor, setCollectionColor] = useState("");
  const [collectionTitle, setCollectionTitle] = useState("");

  return (
    <FormLayout
      admitButtonName="Create Collection"
      admitFunction={async () => {
        await createCollection(id, collectionTitle, collectionColor);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        placeholder="Collection Name"
        onChange={(e) => setCollectionTitle(e.target.value)}
      />
      <PrimaryInput
        type="color"
        className="!p-1 !h-10 !w-10"
        onChange={(e) => setCollectionColor(e.target.value)}
      />
    </FormLayout>
  );
};

export default CollectionForm;
