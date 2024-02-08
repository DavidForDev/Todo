import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = new Cookies();

// =========== Helper =========== \\
import { useError } from "../../../../hooks/useError";

export const signUp_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const newAccount = actions.payload.response.createAccount;
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      if (!newAccount.token) return;

      cookie.set("token", newAccount.token);
      location.reload();
    } catch (error) {
      throw error;
    }
  });
};

export const currentUser_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state, actions) => {
    try {
      state.status = "loading";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state, actions) => {
    try {
      state.status = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const { email, userName, _id, tasks } = actions.payload.response.getUser;
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      state.currentUser = {
        email: email,
        userName: userName,
        id: _id,
      };
      state.tasks = tasks;
      state.status = "success";
    } catch (error) {
      throw error;
    }
  });
};

export const changeProfile_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const updatedUser = actions.payload.response.changeProfile;
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      state.currentUser = updatedUser;
      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const singIn_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const account = actions.payload.response.loginUser;
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      if (!account.token) return;

      cookie.set("token", account.token);
      location.reload();
    } catch (error) {
      throw error;
    }
  });
};

export const getUser_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
    } catch (error) {
      throw error;
    }
  });
};

export const forgotPassword_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const recoveryPassword_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      state.actionStatus = "succesed";
      location.href = "/";
    } catch (error) {
      throw error;
    }
  });
};

export const removeAccount_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const errors = actions.payload.errors;

      if (errors) return useError(errors, state);

      state.actionStatus = "succesed";

      cookie.remove("token");
      location.href = "/";
    } catch (error) {
      throw error;
    }
  });
};
