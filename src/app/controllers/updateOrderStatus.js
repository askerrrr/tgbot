var env = require("../../env");
var { Bot } = require("grammy");
var { dbServices } = require("../../database/db");
var { AppError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");
var getStatusDescription = require("../../bot/services/different/getStatusDescription");

var bot = new Bot(env.main_bot_token);

var updateOrderStatus = async (req, res, next) => {
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

  try {
    var isStatusUpdated = await db.updateOrderStatus(
      userId,
      orderId,
      orderStatus
    );

    if (!isStatusUpdated) {
      throw new AppError(userId, orderId);
    }

    var statusDescription = getStatusDescription(orderStatus);

    var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

    await bot.api.sendMessage(userId, message);

    return res.sendStatus(200);
  } catch (e) {
    e.origin = updateOrderStatus.name;

    if (e instanceof AppError) {
      return next(e);
    }

    next(new AppError(userId, orderId, e));
  }
};

module.exports = updateOrderStatus;
