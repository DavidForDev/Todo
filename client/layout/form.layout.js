// ========== UIElement ========= \\
import { PrimaryButton, SecondaryButton } from "../UIElements/ui.elements";

const FormLayout = ({ children, admitFunction, admitButtonName }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <form className="flex flex-col gap-4 w-full">{children}</form>
      <div className="flex gap-4 w-2/3">
        <PrimaryButton type="button" onClick={admitFunction}>
          {admitButtonName ? admitButtonName : "admit"}
        </PrimaryButton>
        <SecondaryButton className="modal_closer">Cancel</SecondaryButton>
      </div>
    </div>
  );
};

export default FormLayout;
