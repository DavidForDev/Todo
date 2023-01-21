// ========== Layout ========= \\
import FormLayout from "../../layout/form.layout";

const AdmitForm = ({ question, admitFunction }) => {
  return (
    <FormLayout admitFunction={admitFunction}>
      <p className="text-white text-xl">{question}</p>
    </FormLayout>
  );
};

export default AdmitForm;
