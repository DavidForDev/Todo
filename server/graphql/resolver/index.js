// ========== All Resolvers ========== \\
const accountResolver = require("./account.resolver");
const taskResolver = require("./task.resolver");

module.exports = {
  ...accountResolver,
  ...taskResolver,
};
