import Question from "../question";
import Wrapper from "../wrapper.form";

// =========== Redux =========== \\
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { removeAccount } from "../../../../redux/slices/account/thunks/user.thunks";

const RemoveAccountForm = ({ modalId }: { modalId?: string }) => {
  // ========= Redux
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((select: RootState) => select.account);

  const removeAccountHandle = () => {
    const payload = {
      userId: selector.currentUser.id,
    };

    dispatch(removeAccount(payload));
  };

  return (
    <Wrapper admitFunction={removeAccountHandle} modalId={modalId}>
      <Question question="do you want to remove your account?" />
    </Wrapper>
  );
};

export default RemoveAccountForm;
