var env = require("../../env");

var validateAuthHeader = async (authHeader) => {
  if (!authHeader) return;

  var [type, token] = authHeader.split(" ");

  return type == "Bearer" && token == env.bot_secret_key;
};

module.exports = validateAuthHeader;
