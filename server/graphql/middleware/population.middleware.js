const DataLoader = require("dataloader");

const taskModel = require("../../mongodb/schema/task.schema");
const taskItemModel = require("../../mongodb/schema/taskItem.schema");
const userModel = require("../../mongodb/schema/user.schema");

const taskLoader = new DataLoader(async (taskIds) => {
  try {
    const tasks = await taskModel.find({ _id: taskIds });

    const lookUp = tasks.reduce((acc, row) => {
      acc[row._id.toString()] = {
        ...row._doc,
        author: user.bind(this, row.author),
      };
      return acc;
    }, {});

    return taskIds.map((id) => lookUp[id] || null);
  } catch (error) {
    throw error;
  }
});

const taskItemLoader = new DataLoader(async (taskItemId) => {
  try {
    const taskItem = await taskItemModel.find({ _id: taskItemId });

    const lookUp = taskItem.reduce((acc, row) => {
      acc[row._id.toString()] = {
        ...row._doc,
        itemFrom: taskLoader.load(row.itemFrom),
        author: user.bind(this, row.author),
      };
      return acc;
    }, {});

    return taskItemId.map((id) => lookUp[id] || null);
  } catch (error) {
    throw error;
  }
});

const user = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    return {
      ...user._doc,
      tasks: taskLoader.loadMany(user.tasks),
    };
  } catch (error) {
    throw error;
  }
};

exports.taskLoader = taskLoader;
exports.user = user;
exports.taskItemLoader = taskItemLoader;
