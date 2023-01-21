const accountResolever = require("./account.resolver");
const collectionResolver = require("./collection.resolver");

module.exports = {
  ...accountResolever,
  ...collectionResolver,
};
