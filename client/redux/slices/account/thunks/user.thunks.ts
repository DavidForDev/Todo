import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { decode } from "jsonwebtoken";

const cookie = new Cookies();
const token = cookie.get("token");

// =========== Helper ========== \\
import { thunkResponser } from "../../../../hooks/thunkResponser";

export const signUp = createAsyncThunk(
  "account/signup",
  async (payload: any) => {
    const { email, password, userName } = payload;

    try {
      const graphqlSchema = `
    mutation {
      createAccount(createAccountInput:{email: "${email}", password: "${password}", userName: "${userName}"}) {
        _id
        token
      }
    }
  `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const signIn = createAsyncThunk(
  "account/signin",
  async (payload: any) => {
    const { email, password } = payload;

    try {
      const graphqlSchema = `
        query {
          loginUser(loginInput:{email:"${email}", password: "${password}"}) {
            token
          }
        }
      `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const currentUser = createAsyncThunk("account/user", async () => {
  const { id }: any = decode(token);

  try {
    const graphqlSchema = `
        query {
          getUser(userId: "${id}") {
            _id
            email
            userName
            tasks {
              _id
              taskName
              tags {
                name
                color
              }
              createdAt
            }
          }
        }
      `;

    return thunkResponser(graphqlSchema);
  } catch (error) {
    throw error;
  }
});

export const changeProfile = createAsyncThunk(
  "change/profile",
  async (payload: any) => {
    const { id }: any = decode(token);

    try {
      const { newPassword, newUserName, newEmail }: any = payload;

      const graphqlSchema = `
      mutation {
        changeProfile(changeProfileInput:{userId:"${id}", newPassword: "${newPassword}", newUserName: "${newUserName}", newEmail: "${newEmail}"}) {
          _id
          userName
          email
        }
      }
    `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async (payload: any) => {
    const { email } = payload;

    try {
      const graphqlSchema = ` 
          mutation {
            forgotPassword(email: "${email}")
          }
        `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  "recovery/password",
  async (payload: any) => {
    const { token, newPassword, repeatPassword } = payload;

    try {
      const graphqlSchema = `
          mutation {
            changePassword(changePasswordInput: {token: "${token}", repeatPassword: "${repeatPassword}", password: "${newPassword}"})
          }
        `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const removeAccount = createAsyncThunk(
  "account/remove",
  async (payload: any) => {
    const { userId } = payload;
    try {
      const graphqlSchema = ` 
      mutation {
        removeAccount(accountId: "${userId}")
      }
    `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);
