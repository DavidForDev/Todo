const { default: mongoose } = require("mongoose");

exports.CheckMongoId = (Id) => {
  if (!Id) throw new Error("Id not found");

  const validateId = mongoose.Types.ObjectId.isValid(Id);

  return validateId;
};
