const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../mongoose/modal/user.model");

// ========== middleware ========== \\
const { toMail } = require("../middleware/toMail.middleware");
const { collection } = require("../middleware/population.middleware");
const tasksModel = require("../../mongoose/modal/tasks.model");
const collectionModel = require("../../mongoose/modal/collection.model");
const { message } = require("../middleware/message");

module.exports = {
  // ==================== all users
  users: async () => {
    const users = await userModel.find({});

    try {
      return users.map((el) => {
        return {
          ...el,
          collections: collection.bind(this, el.collections),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  exactlyUser: async (args) => {
    const { id } = args;

    const user = await userModel.findById(id);

    try {
      return {
        ...user._doc,
        collections: collection.bind(this, user.collections),
        password: null,
      };
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootMutation
  createUser: async (args) => {
    const { username, email, password } = args.createInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!username || !email || !password)
        return message("error", "please fill all fields");

      // ========== Check if such user arleady exist ========== \\
      const existUser = await userModel.findOne({ email: email });
      if (existUser) return message("error", "such user arleady exist");

      // ========== hash password ========== \\
      const hashedPassword = await bcrypt.hash(password, 12);

      // ========== Save User in Database ========== \\
      const newUser = new userModel({
        username: username,
        email: email,
        password: hashedPassword,
      });

      const saveUser = await newUser.save();

      const jwtToken = await jwt.sign(
        {
          id: saveUser._id.toString(),
          email: saveUser.email,
        },
        process.env.SECRET_KEY,
        { algorithm: "HS256" }
      );

      return {
        ...saveUser._doc,
        password: null,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootQuery
  loginUser: async (args) => {
    const { email, password } = args.loginInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!email || !password)
        return message("error", "please fill all fields");

      // ========== Check if such user is in database ========== \\
      const isUser = await userModel.findOne({ email: email });
      if (!isUser) return message("error", "Email or password is incorrect");

      // ========== Compare passwords ========== \\
      const isMatch = await bcrypt.compare(password, isUser.password);
      if (!isMatch) return message("error", "Email or password is incorrect");

      const jwtToken = await jwt.sign(
        {
          id: isUser._id.toString(),
          email: isUser.email,
        },
        process.env.SECRET_KEY,
        { algorithm: "HS256" }
      );

      return {
        ...isUser._doc,
        password: null,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootMutation
  forgotPassword: async (args) => {
    const { email } = args;

    try {
      // ========== check if inputs are filled ========== \\
      if (!email) return message("error", "please fill all fields");

      // ========== Check if such user is in database ========== \\
      const isUser = await userModel.findOne({ email: email });
      if (!isUser)
        return message("error", "please write correct email address");

      // ========== Create Crypto token ========== \\
      const token = await jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // ========== set token to user data ========== \\
      const updatedUser = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { token: token } },
        { new: true, returnDocument: "after" }
      );

      // ========== send Token to user email ========== \\
      await toMail(
        "Password Recovery",
        `${process.env.APP_URL}/recovery-password/${updatedUser._doc.token}`,
        updatedUser._doc.email
      );

      return message("success", "Please Check Your Email!");
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootMutation
  recoveryPassword: async (args) => {
    const { token, newPassword, confirmPassword } = args.recoveryInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!newPassword || !confirmPassword)
        return message("error", "please fill all fields");
      // ========== check if token is not undefined ========== \\
      if (!token) return message("error", "token is undefined");
      // ========== check if new password and confirm password equels each other ========== \\
      if (newPassword !== confirmPassword)
        return message(
          "error",
          "password and confirm password do not match each other"
        );

      // ========== Check if such user is in database ========== \\
      const isUser = await userModel.findOne({ token: token });
      if (!isUser) return message("error", "token is undefined or damaged");

      // ========== check token expire ========== \\
      const isExpired = jwt.verify(isUser.token, process.env.SECRET_KEY);
      if (Date.now() >= isExpired.exp * 1000)
        return message("error", "token is expired, please try again");

      // ========== hash new password and update it in user database + token shoud becomes null ========== \\
      const hashNewPassword = await bcrypt.hash(newPassword, 12);

      const updatedUser = await userModel.findOneAndUpdate(
        { email: isUser.email },
        { $set: { password: hashNewPassword, token: null } },
        { new: true, returnDocument: "after" }
      );

      // ========== sned message to user that it password is changed ========== \\
      await toMail(
        "Your password was changed successfully",
        `Congratulations ${updatedUser._doc.username}, your password has been changed`,
        updatedUser._doc.email
      );

      return message("success", "your password has been changed!");
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootMutation
  changePassword: async (args) => {
    const { userId, newPassword } = args.changePasswordInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!newPassword) return message("error", "please fill all fields");

      // ========== hash Password and save it========== \\
      const hashNewPassword = await bcrypt.hash(newPassword, 12);

      const changePassword = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { password: hashNewPassword } }
      );

      await changePassword.save();

      return message("success", "your password changed");
    } catch (error) {
      throw error;
    }
  },
  // ==================== from RootMutation
  changeUserName: async (args) => {
    const { userId, newUserName } = args.changeUserNameInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!newUserName) return message("error", "please fill all fields");

      // ========== update username and save it ========== \\
      const updateUserName = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { username: newUserName } },
        { new: true, returnDocument: "after" }
      );

      await updateUserName.save();

      return message("success", "your username changed");
    } catch (error) {
      throw error;
    }
  },
  changeUserEmail: async (args) => {
    const { userId, newEmail } = args.changeEmailInput;

    try {
      // ========== check if inputs are filled ========== \\
      if (!newEmail) return message("error", "please fill all fields");

      // ========== Check if such user arleady exist ========== \\
      const existUser = await userModel.findOne({ email: newEmail });
      if (existUser) return message("error", "such user arleady exist");

      // ========== update Email and save it ========== \\
      const updateUserEmail = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          $set: { email: newEmail },
        },
        { new: true, returnDocument: "after" }
      );

      await updateUserEmail.save();

      return message("success", "your Email changed");
    } catch (error) {
      throw error;
    }
  },
  removeAccount: async (args) => {
    const { userId } = args;

    try {
      // ========== Remove user tasks ========== \\
      await tasksModel.deleteMany({ collectionAuthor: userId });

      // ========== Remove user Collections ========== \\
      await collectionModel.deleteMany({ collectionAuthor: userId });

      // ========== Remove user ========== \\
      await userModel.deleteOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  },
};
