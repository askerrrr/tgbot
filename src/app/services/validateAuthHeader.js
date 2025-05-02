var env = require("../../env");

var validateAuthHeader = async (authHeader) => {
  var [type, token] = authHeader.split(" ");

  return type == "Bearer" && token == env.bot_secret_key;
};

module.exports = validateAuthHeader;
