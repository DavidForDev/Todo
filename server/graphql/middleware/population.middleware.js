const userModel = require("../../mongoose/modal/user.model");
const collectionModel = require("../../mongoose/modal/collection.model");
const tasksModel = require("../../mongoose/modal/tasks.model");

const collection = async (collectionId) => {
  try {
    const collection = await collectionModel.find({ _id: collectionId });

    return collection.map((el) => {
      return {
        ...el._doc,
        collectionAuthor: user.bind(this, el._doc.collectionAuthor),
        tasks: tasks.bind(this, el._doc.tasks),
      };
    });
  } catch (error) {
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    return {
      ...user._doc,
      collections: collection.bind(this, user._doc.collections),
    };
  } catch (error) {
    throw error;
  }
};

const tasks = async (tasksId) => {
  try {
    const tasks = await tasksModel.find({ _id: tasksId });

    return tasks.map((el) => {
      return {
        ...el._doc,
        collectioner: collection.bind(this, el.collectioner),
      };
    });
  } catch (error) {
    throw error;
  }
};

exports.user = user;
exports.collection = collection;
exports.tasks = tasks;
