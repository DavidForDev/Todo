const userModel = require("../../mongodb/schema/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ========== Helper ========== \\
const { useToken } = require("../../helper/useToken.helper");
const { toMail } = require("../../helper/toMail.helper");
const { CheckMongoId } = require("../../helper/checkId.helper");

// ========== Middleware ========== \\
const { taskLoader } = require("../middleware/population.middleware");
const {
  changePassword,
  changeEmail,
  changeUserName,
  removeTask,
} = require("../middleware/crud.middleware");

module.exports = {
  getUser: async (args) => {
    const { userId } = args;

    try {
      // ========== Filter statement
      if (!CheckMongoId(userId)) return new Error("no such user exists");

      const user = await userModel.findById(userId);

      return {
        ...user._doc,
        password: null,
        tasks: taskLoader.loadMany(user.tasks),
      };
    } catch (error) {
      throw error;
    }
  },
  createAccount: async (args) => {
    const { email, password, userName } = args.createAccountInput;

    try {
      // ========== Filter statement
      if (!email || !password || !userName)
        throw new Error("Please fill in all required fields");

      // ========== Filter statement
      if (password.length < 8)
        throw new Error("password must contain 8 characters");

      const user = await userModel.findOne({ email: email.toLowerCase() });

      // ========== Filter statement
      if (user) throw new Error("such a user already exists");

      // ========== create User && hash password && save user
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        email: email,
        password: hashPassword,
        userName: userName,
      });

      const saveUser = await newUser.save();

      // ========== create Token to sign in
      const token = useToken({ id: saveUser._id, email: saveUser.email });

      return {
        ...saveUser._doc,
        token: token,
      };
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (args) => {
    const { email, password } = args.loginInput;

    // ========== Filter statement
    if (!email || !password)
      throw new Error("Please fill in all required fields");

    const user = await userModel.findOne({ email: email.toLowerCase() });

    // ========== Filter statement
    if (!user) throw new Error("no such user exist");

    const comparePassword = await bcrypt.compare(password, user.password);

    // ========== Create Token
    const token = await useToken({ id: user._id, email: user.email });

    // ========== Filter statement
    if (!comparePassword) throw new Error("password do not match");

    return {
      token: token,
    };
  },
  removeAccount: async (args) => {
    const { accountId } = args;

    // ========== Filter statement
    if (!CheckMongoId(accountId)) return new Error("no such user exists");

    const user = await userModel.findById(accountId);

    // ========== Remove tasks
    await removeTask(user.tasks, accountId);

    // ========== Remove Account
    await userModel.findByIdAndRemove(accountId);
  },
  forgotPassword: async (args) => {
    const { email } = args;

    try {
      // ========== Filter statement
      if (!email) throw new Error("Please fill in all required fields");

      const user = await userModel.findOne({ email: email });

      // ========== Filter statement
      if (!user) throw new Error("no such user exist");

      // ========== create token && put in the user Model && send message to gmail
      const token = useToken({ email: user.email }, "1h");

      await userModel.findOneAndUpdate(
        { email: email },
        { $set: { token: token } },
        { new: true }
      );

      const message = `https://todo-forproject.vercel.app/recovery-password/${token}`;

      toMail("forgotPassword", message, email);
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (args) => {
    const { password, repeatPassword, token } = args.changePasswordInput;

    try {
      const { email } = jwt.decode(token);
      const userToken = await userModel.findOne({ email: email });

      // ========== Filter statement
      if (!userToken.token)
        throw new Error("you need new token to recovery password");

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      // ========== Filter statement
      if (Date.now() > verifyToken.exp * 1000)
        throw new Error("Token has expired, please try again");

      // ========== Change Password
      await changePassword(password, repeatPassword, {
        token: token,
      });

      // ========== send message
      const message = `Your password was changed successfully `;

      await toMail("changed password", message, email);
    } catch (error) {
      throw error;
    }
  },
  changeEmail: async (args) => {
    const { newEmail, _id } = args.changeEmailInput;

    try {
      // ========== Change Email
      const changeAccount = await changeEmail(newEmail, _id);

      return changeAccount._doc;
    } catch (error) {
      throw error;
    }
  },
  changeUserName: async (args) => {
    const { _id, newUserName } = args.changeUserNameInput;

    try {
      // ========== change userName
      const updateAccount = await changeUserName(newUserName, _id);

      return { ...updateAccount._doc, _id: updateAccount._id.toString() };
    } catch (error) {
      throw error;
    }
  },
  changeProfile: async (args) => {
    const { newUserName, newEmail, userId, newPassword } =
      args.changeProfileInput;

    try {
      // ========== Filter statement
      if (!CheckMongoId(userId))
        throw new Error("Please login to make changes");

      // ========== Change user Name
      if (newUserName) await changeUserName(newUserName, userId);

      // ========== Change user Email
      if (newEmail) await changeEmail(newEmail, userId);

      // ========== Change user Password
      if (newPassword)
        await changePassword(newPassword, newPassword, { _id: userId });

      // ========== Get finally Updated User
      const updatedUser = await userModel.findById(userId);

      return updatedUser._doc;
    } catch (error) {
      throw error;
    }
  },
};
