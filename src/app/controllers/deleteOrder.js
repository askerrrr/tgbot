var { logger } = require("../../logger");
var { dbServices } = require("../../database/db");
var { reportError } = require("../../errReportBot");
var validateAuthHeader = require("../../errReportBot");

var deleteOrder = async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var { userId, orderId } = req.body;

    var { deleteOrder, checkOrderExists } = await dbServices();

    var isOrderExists = await checkOrderExists(userId, orderId);

    if (!isOrderExists) {
      return res.sendStatus(404);
    }

    var isOrderDeleted = await deleteOrder(userId, orderId);

    if (!isOrderDeleted) {
      await reportError(userId, null, "Запрос на удаление заказа");
      return res.sendStatus(304);
    }

    return res.sendStatus(200);
  } catch (err) {
    await reportError(userId, err, "Запрос на удаление заказа");
    logger.error({ place: "delete order", userId, err });
    return res.sendStatus(500);
  }
};

module.exports = deleteOrder;
