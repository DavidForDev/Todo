const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  collections: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

const userModel = mongoose.model("user", userModelSchema);

module.exports = userModel;
