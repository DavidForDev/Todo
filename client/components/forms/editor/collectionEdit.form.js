import { useContext, useState } from "react";
import { useRouter } from "next/router";

// ========== UIElement ========= \\
import { PrimaryInput, SecondaryButton } from "../../../UIElements/ui.elements";

// ========== Layout ========= \\
import FormLayout from "../../../layout/form.layout";

// ========== Context ========= \\
import { toolsContext } from "../../../contexts/tools.context";

const CollectionEditForm = ({ data }) => {
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionColor, setCollectionColor] = useState("");
  const { editCollection, removeCollection } = useContext(toolsContext);
  const router = useRouter();

  return (
    <FormLayout
      admitFunction={async () => {
        editCollection(data._id, collectionTitle, collectionColor);
        await router.replace(router.asPath);
      }}
    >
      <PrimaryInput
        type="text"
        defaultValue={data.collectionTitle}
        onChange={(e) => setCollectionTitle(e.target.value)}
      />
      <PrimaryInput
        type="color"
        className="!p-1 !h-10 !w-10"
        onChange={(e) => setCollectionColor(e.target.value)}
      />
      <SecondaryButton
        type="button"
        onClick={async () => {
          await removeCollection(data._id);
          await router.back();
          await router.replace(router.asPath);
        }}
      >
        Remove Collection
      </SecondaryButton>
    </FormLayout>
  );
};

export default CollectionEditForm;
