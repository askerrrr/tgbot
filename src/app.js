var { env } = require("./env");
var { Bot } = require("grammy");
var express = require("express");
var { reportError } = require("./errReportBot");
var { deleteUser } = require("./database/services/deleteUser");
var { deleteOrder } = require("./database/services/deleteOrder");
var {
  getStatusDescription,
} = require("./services/different/getStatusDescription");
var { updateOrderStatus } = require("./database/services/updateOrderStatus");
const { checkOrderExists } = require("./database/services/checkOrderExists");

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

    if (isStatusUpdated) {
      var statusDescription = getStatusDescription(orderStatus);

      var message = `Статус заказа ${orderId} изменен.\nТекущий статус: ${statusDescription}`;

      await bot.api.sendMessage(userId, message);
      res.sendStatus(200);
    } else {
      await reportError(userId, null, "Попытка обновления статуса заказа");
      return;
    }
  } catch (err) {
    await reportError(userId, err, "Попытка обновления статуса заказа");
    res.sendStatus(500);
  }
});

app.delete("/order", async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    var [type, token] = authHeader.split(" ");

    if (type !== "Bearer" && token !== env.bot_secret_key) {
      res.sendStatus(401);
      return;
    }

    var { userId, orderId } = req.body;

    var isOrderExists = await checkOrderExists(userId, orderId);

    if (isOrderExists) {
      var isOrderDeleted = await deleteOrder(userId, orderId);

      if (isOrderDeleted) {
        res.sendStatus(200);
        return;
      }

      await reportError(userId, null, "Запрос на удаление заказа");
      res.sendStatus(304);
      return;
    }

    res.sendStatus(404);
    return;
  } catch (err) {
    await reportError(userId, err, "Запрос на удаление заказа");
    res.sendStatus(500);
  }
});

app.delete("/user", async (req, res) => {
  try {
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

    if (isUserDeleted) {
      res.sendStatus(200);
      return;
    } else {
      await reportError(userId, null, "Запрос на удаление пользователя");
      res.sendStatus(304);
      return;
    }
  } catch (err) {
    await reportError(userId, null, "Запрос на удаление пользователя");
    res.sendStatus(500);
  }
});

app.listen(env.PORT, env.HOST, () =>
  console.log("The server running on " + env.HOST + ":" + env.PORT)
);
