var env = require("../../env");
var { Bot } = require("grammy");
var { dbServices } = require("../../database/db");
var { OrderStatusUpdateError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");
var getStatusDescription = require("../../bot/services/different/getStatusDescription");

var bot = new Bot(env.main_bot_token);

var updateOrderStatus = async (req, res, next) => {
  try {
    var authHeader = req.headers?.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(403);
    }

    var db = await dbServices();

    var { userId, orderId, orderStatus } = req.body;

    var isStatusUpdated = await db.updateOrderStatus(
      userId,
      orderId,
      orderStatus
    );

    if (!isStatusUpdated) {
      throw new OrderStatusUpdateError(userId, orderId);
    }

    var statusDescription = getStatusDescription(orderStatus);

    var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

    await bot.api.sendMessage(userId, message);

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = updateOrderStatus;
