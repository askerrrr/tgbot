var { randomBytes } = require("crypto");

var getUserData = async (data) => {
  var userId = data.id + "";
  var userName = data.username ?? "";
  var firstName = data.first_name ?? "";
  var passwd = randomBytes(5).toString("hex");

  return { userId, passwd, userName, firstName };
};

module.exports = getUserData;
