import { createSlice } from "@reduxjs/toolkit";

import { sameState } from "../initialState";

export const initialState: any = {
  currentUser: {},
  status: "idl",
  ...sameState,
};

// ========== reducers ========== \\
import { userReducer } from "./reducers/user.reducer";

// ========= Builder ========== \\
import {
  changeProfile_Builder,
  currentUser_Builder,
  forgotPassword_Builder,
  recoveryPassword_Builder,
  removeAccount_Builder,
  signUp_Builder,
  singIn_Builder,
} from "./thunks/user.builder";

// ========= Thunk ========== \\
import {
  changeProfile,
  currentUser,
  forgotPassword,
  recoveryPassword,
  removeAccount,
  signIn,
  signUp,
} from "./thunks/user.thunks";

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: userReducer,
  extraReducers: (builder) => {
    singIn_Builder(builder, signIn);
    signUp_Builder(builder, signUp);
    forgotPassword_Builder(builder, forgotPassword);
    changeProfile_Builder(builder, changeProfile);
    currentUser_Builder(builder, currentUser);
    recoveryPassword_Builder(builder, recoveryPassword);
    removeAccount_Builder(builder, removeAccount);
  },
});

export const { logOut } = AccountSlice.actions;

export default AccountSlice.reducer;
