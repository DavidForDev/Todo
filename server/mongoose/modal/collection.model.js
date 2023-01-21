const mongoose = require("mongoose");

const collectionModelSchema = new mongoose.Schema({
  collectionTitle: {
    type: String,
  },
  collectionColor: {
    type: String,
  },
  donePrecent: {
    type: Number,
    default: 0,
  },
  doneString: {
    type: String,
    default: "0/0",
  },
  collectionAuthor: mongoose.Types.ObjectId,
  tasks: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

const collectionModel = mongoose.model("collections", collectionModelSchema);

module.exports = collectionModel;
