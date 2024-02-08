const mongoose = require("mongoose");

const taskItemSchema = new mongoose.Schema(
  {
    taskItemName: {
      type: String,
    },
    description: {
      type: String,
    },
    attach: [
      {
        name: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      default: "todo",
    },
    itemFrom: {
      type: mongoose.Schema.Types.ObjectId,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const taskItemModel = mongoose.model("taskItems", taskItemSchema);

module.exports = taskItemModel;
