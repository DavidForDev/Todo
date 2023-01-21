const collectionModel = require("../../mongoose/modal/collection.model");
const userModel = require("../../mongoose/modal/user.model");
const tasksModel = require("../../mongoose/modal/tasks.model");

// ========== middleware ========== \\
const { user, tasks } = require("../middleware/population.middleware");
const { CalculatePrecent } = require("../middleware/calculatePrecent");
const { message } = require("../middleware/message");

module.exports = {
  // ===== from RootQuery
  collections: async () => {
    const collections = await collectionModel.find({});

    try {
      return collections.map((el) => {
        return {
          ...el._doc,
          collectionAuthor: user.bind(this, el._doc.collectionAuthor),
          tasks: tasks.bind(this, el.tasks),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  exactlyCollection: async (args) => {
    const { collectionId } = args;

    const collection = await collectionModel.findById(collectionId);

    try {
      return {
        ...collection._doc,
        collectionAuthor: user.bind(this, collection.collectionAuthor),
        tasks: tasks.bind(this, collection.tasks),
      };
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation
  createCollection: async (args) => {
    const { collectionTitle, collectionColor, collectionAuthor } =
      args.collectionInput;

    try {
      // ========== check if Inputs is fill =========== \\
      if (!collectionTitle || !collectionColor)
        return message("error", "please fill all fields");

      if (!collectionAuthor) return message("error", "You are not logged in");

      const collection = await collectionModel.findOne({
        collectionTitle: collectionTitle,
      });

      // ========== check if such collection is arleady in database =========== \\
      if (collection)
        return message("error", "such Collection name arleady have");

      // ========== create new collection and save it =========== \\
      const newCollection = new collectionModel({
        collectionAuthor: collectionAuthor,
        collectionTitle: collectionTitle,
        collectionColor: collectionColor,
      });
      const saveNewCollection = await newCollection.save();

      // ========== push NewCollection id in user database =========== \\
      await userModel.findByIdAndUpdate(
        { _id: collectionAuthor },
        { $push: { collections: saveNewCollection._id } }
      );

      return saveNewCollection._doc;
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation
  createTasks: async (args) => {
    const { tasksTitle, collectionId, collectionAuthor } = args.taskInput;

    try {
      // ========== check if Inputs is fill =========== \\
      if (!tasksTitle) return message("error", "please fill all fields");

      if (!collectionId || !collectionAuthor)
        return message(
          "error",
          "You are not logged in or this collection is damaged"
        );

      // ========== create new task =========== \\
      const newTask = await tasksModel({
        tasksTitle: tasksTitle,
        collectioner: collectionId,
        collectionAuthor: collectionAuthor,
      });

      const saveTask = await newTask.save();

      // ========== new task id in collection.tasks =========== \\
      await collectionModel.findByIdAndUpdate(
        { _id: collectionId },
        { $push: { tasks: saveTask._id } },
        { new: true }
      );

      return saveTask._doc;
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation
  createTaskItem: async (args) => {
    const { taskItemTitle, deadline, taskId } = args.taskItemInput;

    try {
      // ========== check if Inputs is fill =========== \\
      if (!taskItemTitle) return message("error", "please fill all fields");

      if (!taskId) return message("error", "You are not logged in");

      // ========== push task item in database and save it =========== \\
      const taskItem = await tasksModel.findByIdAndUpdate(
        { _id: taskId },
        {
          $push: {
            tasksItems: {
              taskItemTitle: taskItemTitle,
              deadline: deadline,
            },
          },
        },
        { new: true }
      );

      const saveTaskItem = await taskItem.save();

      await CalculatePrecent(saveTaskItem.collectioner);

      return saveTaskItem.tasksItems.map((el) => {
        return el._doc;
      });
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation
  markAsDone: async (args) => {
    const { taskItemId } = args;

    try {
      // ========== toggle boolean (updater / done) = when task is complete =========== \\

      const task = await tasksModel.findOne({ "tasksItems._id": taskItemId });
      if (!task) return;
      for (let i = 0; i < task.tasksItems.length; i++) {
        if (task.tasksItems[i]._id.toString() === taskItemId) {
          task.tasksItems[i].done = !task.tasksItems[i].done;
        }
      }
      await task.save();

      await CalculatePrecent(task.collectioner);
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation  edit collection || task || taskItem
  editCollection: async (args) => {
    const { collectionId, newCollectionTitle, newCollectionColor } =
      args.editCollectionInput;

    try {
      // ========== check if all field is not empty =========== \\
      if (!newCollectionTitle)
        return message("error", "please fill all fields");

      // ========== edit and save it =========== \\
      const editCollection = await collectionModel.findByIdAndUpdate(
        collectionId,
        {
          $set: {
            collectionTitle: newCollectionTitle,
            collectionColor: newCollectionColor,
          },
        },
        { new: true }
      );

      return editCollection._doc;
    } catch (error) {
      throw error;
    }
  },
  editTask: async (args) => {
    const { taskId, newTaskTitle } = args.editTaskInput;

    try {
      // ========== check if all field is not empty =========== \\
      if (!newTaskTitle) return message("error", "please fill all fields");

      // ========== edit and save it =========== \\
      const editTask = await tasksModel.findByIdAndUpdate(
        taskId,
        {
          $set: { tasksTitle: newTaskTitle },
        },
        { new: true }
      );

      return editTask._doc;
    } catch (error) {
      throw error;
    }
  },
  editTaskItem: async (args) => {
    const { taskItemId, newTaskItemTitle, newTaskItemDeadline } =
      args.editTaskItemInput;

    try {
      // ========== edit and save it =========== \\
      const editTask = await tasksModel.findOneAndUpdate(
        {
          "tasksItems._id": taskItemId,
          tasksItems: {
            $elemMatch: {
              _id: taskItemId,
            },
          },
        },
        {
          $set: {
            "tasksItems.$.taskItemTitle": newTaskItemTitle,
            "tasksItems.$.deadline": newTaskItemDeadline,
          },
        },
        { new: true }
      );

      return editTask.tasksItems.map((el) => {
        return el;
      });
    } catch (error) {
      throw error;
    }
  },
  // ===== from RootMutation Remove collection || task || taskItem
  removeCollection: async (args) => {
    const { collectionId } = args;

    try {
      // ========== check if all field is not empty =========== \\
      if (!collectionId)
        return message("error", "collection is removed or damaged");

      // ========== delete Collection everywhere =========== \\
      const collection = await collectionModel.findOne({ _id: collectionId });

      await tasksModel.deleteMany({
        _id: collection.tasks,
      });

      await userModel.findByIdAndUpdate(collection.collectionAuthor, {
        $pull: { collections: collectionId },
      });

      // ========== finally remove the collection, because before we need collection id =========== \\
      await collectionModel.deleteOne({
        _id: collectionId,
      });
    } catch (error) {
      throw error;
    }
  },
  removeTask: async (args) => {
    const { taskId } = args;

    try {
      // ========== check if all field is not empty =========== \\
      if (!taskId) return message("error", "task is removed or damaged");

      // ========== delete Task everywhere =========== \\
      const task = await tasksModel.findOne({ _id: taskId });

      await collectionModel.findByIdAndUpdate(task.collectioner, {
        $pull: { tasks: taskId },
      });

      // ========== finally remove the Task, because before we need Task id =========== \\
      await tasksModel.deleteOne({ _id: taskId });

      await CalculatePrecent(task.collectioner);
    } catch (error) {
      throw error;
    }
  },
  removeTaskItem: async (args) => {
    const { taskItemId } = args;

    try {
      // ========== check if all field is not empty =========== \\
      if (!taskItemId)
        return message("error", "taskItem is removed or damaged");

      // ========== delete TaskItem =========== \\
      const removeTasksItem = await tasksModel.findOneAndUpdate(
        {
          "tasksItems._id": taskItemId,
        },
        { $pull: { tasksItems: { _id: taskItemId } } },
        { new: true }
      );

      await CalculatePrecent(removeTasksItem.collectioner);
    } catch (error) {
      throw error;
    }
  },
};
