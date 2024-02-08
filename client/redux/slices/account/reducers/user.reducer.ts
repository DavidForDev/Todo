import Cookies from "universal-cookie";
const cookie = new Cookies();

export const userReducer = {
  logOut: async () => {
    try {
      cookie.remove("token");
      location.href = "/";
    } catch (error) {
      throw error;
    }
  },
};
