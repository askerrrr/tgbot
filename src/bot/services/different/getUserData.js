var { randomBytes } = require("crypto");

var getUserData = async ({ id, first_name = "", username = "" }) => {
  var passwd = randomBytes(5).toString("hex");

  return { passwd, userId: id + "", firstName: first_name, userName: username };
};

module.exports = getUserData;
