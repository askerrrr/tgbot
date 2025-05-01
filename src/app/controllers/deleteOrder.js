var { dbServices } = require("../../database/db");
var { reportError } = require("../../bot/errReportBot");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteOrder = async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var { userId, orderId } = req.body;

    var db = await dbServices();

    var isOrderExists = await db.checkOrderExists(userId, orderId);

    if (!isOrderExists) {
      return res.sendStatus(404);
    }

    var isOrderDeleted = await db.deleteOrder(userId, orderId);

    if (!isOrderDeleted) {
      return res.sendStatus(304);
    }

    return res.sendStatus(200);
  } catch (err) {
    err.location = "deleteUser controller";

    await reportError(userId, err);

    return res.sendStatus(500);
  }
};

module.exports = deleteOrder;
