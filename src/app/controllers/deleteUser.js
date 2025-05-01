var { dbServices } = require("../../database/db");
var { reportError } = require("../../bot/errReportBot");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteUser = async (req, res) => {
  try {
    var authHeader = req.headers?.authorization;

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var db = await dbServices();

    var { userId } = req.body;

    var isUserDeleted = await db.deleteUser(userId);

    if (!isUserDeleted) {
      return res.sendStatus(304);
    }

    return res.sendStatus(200);
  } catch (err) {
    err.location = "deleteUser controller";

    await reportError(userId, err);

    return res.sendStatus(500);
  }
};

module.exports = deleteUser;
