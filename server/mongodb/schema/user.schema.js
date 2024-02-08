const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
