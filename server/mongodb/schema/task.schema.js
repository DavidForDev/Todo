const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
    },
    createAt: Date,
    tags: [
      {
        name: {
          type: String,
        },
        color: {
          type: String,
        },
      },
    ],
    taskItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
