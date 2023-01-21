import { decode } from "jsonwebtoken";
import * as cookie from "cookie";
import { useContext } from "react";

// ========== Layout ========== \\
import BodyLayout from "../layout/body.layout";
import UseModal from "../layout/useModal";

// ========== Components ========== \\
import EmailEditForm from "../components/forms/editor/emailEdit.form";
import PasswordEditForm from "../components/forms/editor/passwordEdit.form";
import UserNameEditForm from "../components/forms/editor/userNameEdit.form";
import AdmitForm from "../components/forms/admit.form";

// ========== UIElement ========== \\
import { SecondaryButton } from "../UIElements/ui.elements";

// ========== Helper ========== \\
import { UseGraphql } from "../helper/request.helper";

// ========== Contexts ========== \\
import { AccountContext } from "../contexts/account.context";

const Profile = ({ data }) => {
  const { username, email } = data.exactlyUser;
  const { signOut, removeAccount } = useContext(AccountContext);

  return (
    <BodyLayout pageTitle="My Account" backButton="/">
      <div className="flex flex-col gap-6">
        <div className="bg-[#21212B] p-8 rounded-xl">
          <ul className="flex flex-col gap-8">
            <li className="flex items-center justify-between flex-wrap">
              <div>
                <p className="text-sm text-[#56565D]">Display name</p>
                <h3 className="text-[#D9D9D9] text-lg">{username}</h3>
              </div>
              <SecondaryButton className="!w-20 !py-2" aria-label="#editName">
                Edit
              </SecondaryButton>
              <UseModal modalName="editName">
                <UserNameEditForm username={username} />
              </UseModal>
            </li>
            <li className="flex items-center justify-between flex-wrap">
              <div>
                <p className="text-sm text-[#56565D]">Email</p>
                <h3 className="text-[#D9D9D9] text-lg">{email}</h3>
              </div>
              <SecondaryButton className="!w-20 !py-2" aria-label="#editEmail">
                Edit
              </SecondaryButton>
              <UseModal modalName="editEmail">
                <EmailEditForm userEmail={email} />
              </UseModal>
            </li>
            <li className="flex items-center justify-between flex-wrap">
              <div>
                <p className="text-sm text-[#56565D]">Password</p>
                <h3 className="text-[#D9D9D9] text-lg">*********</h3>
              </div>
              <SecondaryButton
                className="!w-20 !py-2"
                aria-label="#editPassword"
              >
                Change
              </SecondaryButton>
              <UseModal modalName="editPassword">
                <PasswordEditForm />
              </UseModal>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex gap-5 justify-center items-center flex-wrap w-full">
            <SecondaryButton
              type="button"
              onClick={signOut}
              className="lg:!w-52"
            >
              Sign Out
            </SecondaryButton>
            <SecondaryButton
              type="button"
              aria-label="#removerModal"
              className="lg:!w-52"
            >
              Remove Account
            </SecondaryButton>
          </div>
          <UseModal modalName="removerModal">
            <AdmitForm
              question="Do you want to delete your account?"
              admitFunction={removeAccount}
            />
          </UseModal>
        </div>
      </div>
    </BodyLayout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);

  const payload = await decode(token);

  const graphqlSchema = `
    query {
      exactlyUser(id: "${payload.id}") {
        username
        email
      }
    }
  `;

  const { data } = await UseGraphql(graphqlSchema);

  return {
    props: {
      data: data,
    },
  };
}

export default Profile;
