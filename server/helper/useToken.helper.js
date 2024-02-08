const jwt = require("jsonwebtoken");

exports.useToken = (args, expiresIn) => {
  const token = jwt.sign(args, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expiresIn ? expiresIn : "0",
  });

  return token;
};
