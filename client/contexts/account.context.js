import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";
import Cookies from "universal-cookie";

// ========== Helper ========== \\
import { UseGraphql } from "../helper/request.helper";

// ========== Components ========== \\
import PopupCard from "../components/popupCard/popupCard";

const changer = {
  changePassword: null,
  changeUserEmail: null,
  changeUserName: null,
};

const recovery = {
  forgotPassword: null,
  recoveryPassword: null,
};

const userDetail = {
  id: "",
  email: "",
};

const initialState = {
  signIn: null,
  signUp: null,
  signOut: null,
  message: [],
  ...changer,
  ...recovery,
  ...userDetail,
};

export const AccountContext = createContext(initialState);

const AccountServerWrapper = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  const cookie = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("token");

    if (!token) return;

    const payload = decode(token);

    setUserId(payload.id);
    setUserEmail(payload.email);
  });

  // ============ Create/remove Token =========== \\
  const createToken = async (data) => {
    if (!data.token) return;

    cookie.set("token", data.token, { path: "/" });
    router.push("/");
  };

  const removeToken = async () => {
    const token = await cookie.get("token");

    if (!token) return;

    cookie.remove("token", { path: "/" });
  };

  // ============ Account functions =========== \\
  const signIn = async (email, password) => {
    const graphqlShcema = `
      query {
        loginUser(loginInput: {email: "${email}", password: "${password}"}) {
          _id
          email
          token
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.loginUser;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });

    return createToken(data.loginUser);
  };

  const signUp = async (username, email, password) => {
    const graphqlShcema = `
      mutation {
        createUser(createInput: {username: "${username}", email: "${email}", password: "${password}"}) {
          _id
          email
          token
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.createUser;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });

    return createToken(data.createUser);
  };

  const signOut = async () => {
    removeToken();
    window.location.href = "/sign-in";
  };

  const forgotPassword = async (email) => {
    const graphqlShcema = `
    mutation {
      forgotPassword(email: "${email}") {
        alert {
          message
          type
        }
      }
    }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.forgotPassword;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const recoveryPassword = async (newPassword, confirmPassword, token) => {
    const graphqlShcema = `
      mutation{
        recoveryPassword(recoveryInput: {newPassword: "${newPassword}", confirmPassword: "${confirmPassword}", token: "${token}"}) {
          _id
          alert {
            message
            type
          }
        }
      }    
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.recoveryPassword;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const changePassword = async (userId, newPassword) => {
    const graphqlShcema = `
      mutation {
        changePassword(changePasswordInput: {userId: "${userId}", newPassword: "${newPassword}"}) {
          _id
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.changePassword;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const changeUserName = async (userId, newUserName) => {
    const graphqlShcema = `
      mutation {
        changeUserName(changeUserNameInput: { userId: "${userId}", newUserName: "${newUserName}" }) {
          _id
          username
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.changeUserName;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const changeUserEmail = async (userId, newUserEmail) => {
    const graphqlShcema = `
      mutation {
        changeUserEmail(changeEmailInput: { userId: "${userId}", newEmail: "${newUserEmail}" }) {
          _id
          email
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.changeUserEmail;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const removeAccount = async () => {
    const graphqlShcema = `
    mutation {
      removeAccount(userId: "${userId}") {
        _id
      }
    }
  `;

    await signOut();

    const { data, errors } = await UseGraphql(graphqlShcema);
  };

  // =========== Finally ========== \\
  const changer = {
    changePassword: changePassword,
    changeUserEmail: changeUserEmail,
    changeUserName: changeUserName,
  };

  const recovery = {
    forgotPassword: forgotPassword,
    recoveryPassword: recoveryPassword,
  };

  const userDetail = {
    id: userId,
    email: userEmail,
  };

  const store = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    removeAccount: removeAccount,
    message: message,
    ...changer,
    ...recovery,
    ...userDetail,
  };

  return (
    <>
      <AccountContext.Provider value={store}>
        {children}
      </AccountContext.Provider>
      {message.message !== "" ? (
        <PopupCard
          openStatus={true}
          cardStatus={message.type}
          setMessage={setMessage}
          message={message.message}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AccountServerWrapper;
