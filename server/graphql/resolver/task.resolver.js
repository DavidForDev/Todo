const taskModel = require("../../mongodb/schema/task.schema");
const taskItemModel = require("../../mongodb/schema/taskItem.schema");
const userModel = require("../../mongodb/schema/user.schema");

// ========== Middleware ========== \\
const {
  taskItemLoader,
  user,
  taskLoader,
} = require("../middleware/population.middleware");

const { removeTask, removeTaskItem } = require("../middleware/crud.middleware");

// ========== Helper ========== \\
const { CheckMongoId } = require("../../helper/checkId.helper");

module.exports = {
  getTasks: async (args) => {
    const { accountId } = args;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(accountId)) throw new Error("There is no such task");

      const user = await userModel.findById(accountId);

      return taskLoader.loadMany(user._doc.tasks);
    } catch (error) {
      throw error;
    }
  },
  specialTask: async (args) => {
    const { taskId } = args;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskId)) throw new Error("There is no such task");

      const task = await taskModel.findById(taskId);

      const taskItems = await taskItemLoader.loadMany(task.taskItems);

      // ======= Filter By Status
      const filterByStatus = (status) => {
        return taskItems.filter((x) => x.status === status);
      };

      return {
        ...task._doc,
        taskItems: {
          todo: filterByStatus("todo"),
          doing: filterByStatus("doing"),
          done: filterByStatus("done"),
        },
        author: user.bind(this, task.author),
      };
    } catch (error) {
      throw error;
    }
  },
  createTask: async (args) => {
    const { taskName, userId, tags } = args.taskInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(userId)) throw new Error("no such user exists");

      // ====== Filter Statement
      if (!taskName) throw new Error("Please fill in all required fields");

      // ====== Create new Task
      const newTask = new taskModel({
        taskName: taskName,
        tags: tags,
        author: userId,
      });

      const saveNewTask = await newTask.save();

      // ====== Put saveNewTask._id in user.tasks
      await userModel.findByIdAndUpdate(
        userId,
        { $push: { tasks: saveNewTask._id } },
        { new: true }
      );

      return {
        ...saveNewTask._doc,
        alert: true,
      };
    } catch (error) {
      throw error;
    }
  },
  editTask: async (args) => {
    const { taskName, tags, taskId } = args.taskInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskId)) throw new Error("There is no such task");

      // ====== Update Task && save it
      const updateTask = await taskModel.findByIdAndUpdate(
        taskId,
        { $set: { taskName: taskName, tags: tags } },
        { new: true, returnDocument: "after" }
      );

      return {
        ...updateTask._doc,
        alert: true,
      };
    } catch (error) {
      throw error;
    }
  },
  removeTask: async (args) => {
    const { taskId, userId } = args.removeTaskInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskId)) throw new Error("There is no such task");

      await removeTask(taskId, userId);

      return { alert: true };
    } catch (error) {
      throw error;
    }
  },
  createTaskItem: async (args) => {
    const { taskItemName, description, attach, taskId } = args.taskItemInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskId))
        throw new Error("No such task existss to create a task item");

      const task = await taskModel.findById(taskId);

      // ====== Filter Statement
      if (!taskItemName) throw new Error("Please fill in all required fields");

      // ====== Create Task Item && save it && save _id in task.taskItems
      const newTaskItem = new taskItemModel({
        taskItemName: taskItemName,
        description: description,
        attach: attach,
        itemFrom: taskId,
        author: task.author,
      });

      const saveNewTaskItem = await newTaskItem.save();

      await taskModel.findByIdAndUpdate(
        taskId,
        { $push: { taskItems: newTaskItem._id } },
        { new: true }
      );

      return {
        ...saveNewTaskItem._doc,
        author: user.bind(this, saveNewTaskItem.author),
        alert: true,
      };
    } catch (error) {
      throw error;
    }
  },
  editTaskItem: async (args) => {
    const { taskItemName, description, tags, attach, taskItemId } =
      args.taskItemInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskItemId))
        throw new Error("No such task Item existss");

      // ====== update task item && save it
      const updateTaskitem = await taskItemModel.findByIdAndUpdate(
        taskItemId,
        {
          $set: {
            taskItemName: taskItemName,
            description: description,
            tags: tags,
            attach: attach,
          },
        },
        { new: true }
      );

      return {
        ...updateTaskitem._doc,
        author: user.bind(this, updateTaskitem.author),
        alert: true,
      };
    } catch (error) {
      throw error;
    }
  },
  removeTaskItem: async (args) => {
    const { taskItemId } = args;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskItemId))
        throw new Error("No such task existss to Delete a task item");

      const removedTaskItem = await removeTaskItem(taskItemId);

      return {
        ...removedTaskItem._doc,
        alert: true,
      };
    } catch (error) {
      throw error;
    }
  },
  changeStatus: async (args) => {
    const { taskItemId, newStatus } = args.changeStatusInput;

    try {
      // ====== Filter Statement
      if (!CheckMongoId(taskItemId))
        throw new Error("No such task existss to Change a task item Status");

      const taskItem = await taskItemModel.findById(taskItemId);

      // ====== Filter Statement
      if (taskItem.status === newStatus)
        return {
          ...taskItem._doc,
          author: user.bind(this, taskItem.author),
        };

      // ====== Filter Statement
      if (!taskItemId || !newStatus)
        throw new Error("such task Item not exists");

      const updateTaskItem = await taskItemModel.findByIdAndUpdate(
        taskItemId,
        { $set: { status: newStatus } },
        { new: true }
      );

      const findTask = await taskModel.findById(updateTaskItem.itemFrom);

      const taskItems = await taskItemLoader.loadMany(findTask.taskItems);

      // ======= Filter By Status
      const filterByStatus = (status) => {
        return taskItems.filter((x) => x.status === status);
      };

      return {
        todo: filterByStatus("todo"),
        doing: filterByStatus("doing"),
        done: filterByStatus("done"),
      };
    } catch (error) {
      throw error;
    }
  },
};
