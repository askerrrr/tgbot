var { env } = require("./env");
var { Bot } = require("grammy");
var express = require("express");
var { reportError } = require("./errReportBot");
var { deleteUser } = require("./database/services/deleteUser");
var { deleteOrder } = require("./database/services/deleteOrder");
var { statusTranslate } = require("./services/different/statusTranslate");
var { updateOrderStatus } = require("./database/services/updateOrderStatus");

var app = express();
var bot = new Bot(env.main_bot_token);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", env.main_server);
  res.setHeader("Access-Control-Allow-Methods", "PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    ["Content-Type", "Authorization"].join(",")
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.patch("/", async (req, res) => {
  try {
    var authHeader = req.headers?.authorization;

    if (!authHeader) return res.sendStatus(401);

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      return res.sendStatus(401);
    }

    var { userId, orderId, orderStatus } = req.body;

    var isStatusUpdated = await updateOrderStatus(userId, orderId, orderStatus);

    if (!isStatusUpdated) {
      await reportError(userId, null, "Попытка обновления статуса заказа");
      return;
    }

    var message = `Статус заказа ${orderId} изменен.\nТекущий статус:\n${statusTranslate(
      orderStatus
    )}`;

    await bot.api.sendMessage(userId, message).then(() => res.sendStatus(200));
  } catch (err) {
    await reportError(userId, err, "Попытка обновления статуса заказа");
    return res.sendStatus(500);
  }
});

app.delete("/order", async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      return res.sendStatus(401);
    }

    var { userId, orderId } = req.body;

    await deleteOrder(userId, orderId)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(404));
  } catch (err) {
    await reportError(userId, err, "Запрос на удаление заказа");
    return res.sendStatus(500);
  }
});

app.delete("/user", async (req, res) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    res.sendStatus(401);
  }

  var [type, token] = authHeader.split(" ");

  if (type !== "Bearer" && token !== env.bot_secret_key) {
    res.sendStatus(401);
  }

  var { userId } = req.body;

  var isUserDeleted = await deleteUser(userId);

  if (!isUserDeleted) {
    await reportError(userId, null, "Запрос на удаление пользователя");
    res.sendStatus(304);
    return;
  } else {
    res.sendStatus(200);
  }
});

app.listen(env.PORT, env.HOST, () =>
  console.log("The server running on " + env.HOST + ":" + env.PORT)
);
