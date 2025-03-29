var { env } = require("./env");
var { Bot } = require("grammy");
var express = require("express");
var { logger } = require("./logger");
var { reportError } = require("./errReportBot");
var { deleteUser } = require("./database/services/deleteUser");
var { deleteOrder } = require("./database/services/deleteOrder");
var {
  getStatusDescription,
} = require("./services/different/getStatusDescription");
var { checkOrderExists } = require("./database/services/checkOrderExists");
var { updateOrderStatus } = require("./database/services/updateOrderStatus");

var app = express();
var bot = new Bot(env.main_bot_token);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.patch("/", async (req, res) => {
  try {
    var authHeader = req.headers?.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      return res.sendStatus(401);
    }

    var { userId, orderId, orderStatus } = req.body;

    var isStatusUpdated = await updateOrderStatus(userId, orderId, orderStatus);

    if (isStatusUpdated) {
      var statusDescription = getStatusDescription(orderStatus);

      var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

      await bot.api.sendMessage(userId, message);

      return res.sendStatus(200);
    } else {
      res.sendStatus(304);

      return await reportError(
        userId,
        null,
        "Попытка обновления статуса заказа"
      );
    }
  } catch (err) {
    await reportError(userId, err, "Попытка обновления статуса заказа");
    logger.error({ place: "patch order status", userId, err });
    return res.sendStatus(500);
  }
});

app.delete("/order", async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      return res.sendStatus(401);
    }

    var { userId, orderId } = req.body;

    var isOrderExists = await checkOrderExists(userId, orderId);

    if (isOrderExists) {
      var isOrderDeleted = await deleteOrder(userId, orderId);

      if (isOrderDeleted) {
        return res.sendStatus(200);
      } else {
        await reportError(userId, null, "Запрос на удаление заказа");
        return res.sendStatus(304);
      }
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    await reportError(userId, err, "Запрос на удаление заказа");
    logger.error({ place: "delete order", userId, err });
    return res.sendStatus(500);
  }
});

app.delete("/user", async (req, res) => {
  try {
    var authHeader = req.headers?.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      return res.sendStatus(401);
    }

    var { userId } = req.body;

    var isUserDeleted = await deleteUser(userId);

    if (isUserDeleted) {
      return res.sendStatus(200);
    } else {
      await reportError(userId, null, "Запрос на удаление пользователя");
      return res.sendStatus(304);
    }
  } catch (err) {
    await reportError(userId, null, "Запрос на удаление пользователя");
    logger.error({ place: "delete user", userId, err });
    return res.sendStatus(500);
  }
});

app.listen(env.PORT, env.HOST, () =>
  console.log("The server running on " + env.HOST + ":" + env.PORT)
);
