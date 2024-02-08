const bcrypt = require("bcryptjs");
const userModel = require("../../mongodb/schema/user.schema");
const taskItemModel = require("../../mongodb/schema/taskItem.schema");
const taskModel = require("../../mongodb/schema/task.schema");

// =========== Helper ========== \\
const { CheckMongoId } = require("../../helper/checkId.helper");

module.exports = {
  changePassword: async (newPassword, repeatPassword, finder) => {
    const finderr = {
      token: finder.token,
      email: finder.email,
      _id: finder._id,
    };

    // =========== in some situation you need to find document with token or email or _id
    const finderFilter = finderr.token
      ? { token: finderr.token }
      : finderr.email
      ? { email: finderr.email }
      : finderr._id
      ? { _id: finderr._id }
      : null;

    const user = await userModel.findOne(finderFilter);

    // ========== Filter statement
    if (!user) throw new Error("no such user exist");

    // ========== Filter statement
    if (!newPassword || !repeatPassword)
      throw new Error("Please fill in all required fields");

    // ========== Filter statement
    if (newPassword !== repeatPassword)
      throw new Error("password do not match");

    // ========== Filter statement
    if (newPassword.length < 8)
      throw new Error("password must contain 8 characters");

    // ========== if password is same
    const samePassword = await bcrypt.compare(newPassword, user.password);

    if (samePassword) throw new Error("You already have a similar password");

    // ========== Hash Password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findOneAndUpdate(
      finderFilter,
      { $set: { password: hashNewPassword, token: null } },
      { new: true, returnDocument: "after" }
    );
  },
  changeEmail: async (newEmail, _id) => {
    // ========== Filter statement
    if (!CheckMongoId(_id)) throw new Error("Please login to make changes");

    const user = await userModel.findById(_id);

    // ========== Filter statement
    if (!newEmail) throw new Error("Please fill in all required fields");

    // ========== Filter statement
    if (newEmail === user.email)
      throw new Error("You already have a similar Email");

    // ========== Changing Procedure
    const changeAccount = await userModel.findByIdAndUpdate(
      _id,
      {
        $set: { email: newEmail.toLowerCase() },
      },
      { new: true }
    );

    return changeAccount;
  },
  changeUserName: async (newUserName, _id) => {
    // ========== Filter statement
    if (!CheckMongoId(_id)) throw new Error("Please login to make changes");

    const user = await userModel.findById(_id);

    // ========== Filter Statement
    if (!newUserName) throw new Error("Please fill in all required fields");

    // ========== Filter Statement
    if (newUserName === user.userName)
      throw new Error("You already have a similar userName");

    // ========== Changing Procedure
    const updateAccount = await userModel.findByIdAndUpdate(
      _id,
      { $set: { userName: newUserName } },
      { new: true }
    );

    return updateAccount;
  },
  removeTask: async (taskId, userId) => {
    // ====== Filter Statement
    if (!CheckMongoId(userId)) return new Error("There is no such task");

    const task = await taskModel.find({ _id: taskId });

    // ====== Remove task Items && finally task
    if (Array.isArray(taskId)) {
      task.forEach(async (el) => {
        await taskItemModel.deleteMany({ _id: el.taskItems });
      });

      taskId.forEach(async (el) => {
        await taskModel.findByIdAndRemove(el);
      });
    } else {
      await taskItemModel.deleteMany({ _id: task[0].taskItems });
      await taskModel.findByIdAndRemove(taskId);
      await userModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
    }
  },
  removeTaskItem: async (taskItemId) => {
    // ====== Filter Statement
    if (!CheckMongoId(taskItemId))
      return new Error("There is no such task item");

    const taskItem = await taskItemModel.findById(taskItemId);

    // ====== remove taskItem ObjectId from task && finally Remove Task Item
    await taskModel.findByIdAndUpdate(
      taskItem.itemFrom,
      {
        $pull: { taskItems: taskItemId },
      },
      { new: true }
    );

    const removedTaskItem = await taskItemModel.findByIdAndDelete({
      _id: taskItemId,
    });

    return removedTaskItem;
  },
};
