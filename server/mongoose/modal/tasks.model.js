const mongoose = require("mongoose");

const TasksModelSchema = new mongoose.Schema({
  tasksTitle: {
    type: String,
  },
  collectioner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  collectionAuthor: {
    type: mongoose.Schema.Types.ObjectId,
  },
  tasksItems: [
    {
      id: mongoose.Schema.Types.ObjectId,
      taskItemTitle: String,
      deadline: {
        type: Number,
        default: 0,
      },
      done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const tasksModel = mongoose.model("tasks", TasksModelSchema);

module.exports = tasksModel;
