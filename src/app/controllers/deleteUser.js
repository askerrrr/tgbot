var { logger } = require("../../logger");
var { dbServices } = require("../../database/db");
var { reportError } = require("../../errReportBot");
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
      await reportError(userId, null, "Запрос на удаление пользователя");
      return res.sendStatus(304);
    }

    return res.sendStatus(200);
  } catch (err) {
    await reportError(userId, null, "Запрос на удаление пользователя");
    logger.error({ place: "delete user", userId, err });
    return res.sendStatus(500);
  }
};

module.exports = deleteUser;
