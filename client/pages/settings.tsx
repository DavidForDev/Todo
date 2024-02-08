import { useContext, useState } from "react";

// =========== Layouts =========== \\
import PageContainer from "../layouts/page";

// =========== Components =========== \\
import Input from "../components/UIElements/input";
import { PrimaryButton } from "../components/UIElements";
import Alert from "../components/messageCard";

// =========== Redux =========== \\
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../redux/slices/account/thunks/user.thunks";

// ========== Icon ========== \\
import EditIcon from "../public/icons/edit";

// ========== Context ========== \\
import { modalContext } from "../context/modal.context";

const Settings = () => {
  const [permission, setPermission] = useState<boolean>(false);

  const [newUserName, setNewUserName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // ========= Context
  const { toggleModal } = useContext(modalContext);

  // ========== Redux
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((select: RootState) => select.account);

  const { userName, email } = selector.currentUser;

  const changeProfileHandle = async () => {
    if (!newUserName && !newEmail && !newPassword) return;

    const payload = {
      newUserName: newUserName,
      newEmail: newEmail,
      newPassword: newPassword,
    };

    dispatch(changeProfile(payload));

    setNewEmail("");
    setNewUserName("");
    setNewPassword("");

    setPermission(selector.actionStatus !== "idle");
  };

  return (
    <PageContainer pageTitle="Settings">
      <div className="w-full lg:w-5/12 m-auto flex flex-col h-full">
        <div className="flex flex-col gap-7 flex-1">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-medium">Settings</h3>
            {!permission ? (
              <EditIcon onClick={() => setPermission(true)} />
            ) : (
              ""
            )}
          </div>
          <div className=" flex flex-col gap-5">
            <Alert />
            <Input
              type="text"
              placeholder="username"
              label={`username: ${userName}`}
              giveValue={setNewUserName}
              disabledStatus={!permission}
              value={newUserName}
            />
            <Input
              type="text"
              placeholder="email"
              label={`email: ${email}`}
              giveValue={setNewEmail}
              disabledStatus={!permission}
              value={newEmail}
            />
            <Input
              type="password"
              placeholder="password"
              label="password"
              giveValue={setNewPassword}
              disabledStatus={!permission}
              value={newPassword}
            />
            {permission ? (
              <div className="flex flex-wrap gap-2 w-full">
                <PrimaryButton
                  onClick={changeProfileHandle}
                  className="flex-1 !bg-gradient-to-r !from-red-500 !to-orange-500"
                >
                  {selector.actionStatus !== "idle"
                    ? selector.actionStatus
                    : "Save Changes"}
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => setPermission(false)}
                  color="transparent"
                  className="!text-black"
                >
                  Cancel
                </PrimaryButton>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-full">
          {permission ? (
            <PrimaryButton
              onClick={() => toggleModal("removeaccount")}
              className="w-full !bg-gradient-to-r !from-red-500 !to-orange-500"
            >
              Delete Account
            </PrimaryButton>
          ) : (
            ""
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
