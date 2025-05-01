var env = require("../../env");
var { Bot } = require("grammy");
var { dbServices } = require("../../database/db");
var { reportError } = require("../../bot/errReportBot");
var validateAuthHeader = require("../services/validateAuthHeader");
var getStatusDescription = require("../../bot/services/different/getStatusDescription");

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
      return res.sendStatus(304);
    }

    var statusDescription = getStatusDescription(orderStatus);

    var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

    var bot = new Bot(env.main_bot_token);

    await bot.api.sendMessage(userId, message);

    return res.sendStatus(200);
  } catch (err) {
    err.location = "updateOrderStatus controller";

    await reportError(userId, err, "Попытка обновления статуса заказа");

    return res.sendStatus(500);
  }
};

module.exports = updateOrderStatus;
