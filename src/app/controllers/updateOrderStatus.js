var { Bot } = require("grammy");
var { logger } = require("../../logger");
var { dbServices } = require("../../database/db");
var { reportError } = require("../../errReportBot");
var validateAuthHeader = require("../services/validateAuthHeader");
var getStatusDescription = require("../../services/different/getStatusDescription");

var updateOrderStatus = async (req, res) => {
  try {
    var authHeader = req.headers?.authorization;

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var db = await dbServices();

    var { userId, orderId, orderStatus } = req.body;

    var isStatusUpdated = await db.updateOrderStatus(
      userId,
      orderId,
      orderStatus
    );

    if (!isStatusUpdated) {
      await reportError(userId, null, "Попытка обновления статуса заказа");

      return res.sendStatus(304);
    }

    var statusDescription = getStatusDescription(orderStatus);

    var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

    var bot = new Bot(env.main_bot_token);

    await bot.api.sendMessage(userId, message);

    return res.sendStatus(200);
  } catch (err) {
    await reportError(userId, err, "Попытка обновления статуса заказа");
    logger.error({ place: "patch order status", userId, err });
    return res.sendStatus(500);
  }
};

module.exports = updateOrderStatus;
