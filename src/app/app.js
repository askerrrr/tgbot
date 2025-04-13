var { env } = require("../env");
var express = require("express");
var { Bot } = require("grammy");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  app.listen(env.PORT, env.HOST, () =>
    console.log("The server running on " + env.HOST + ":" + env.PORT)
  );

  var bot = new Bot(env.main_bot_token);

  app.locals.bot = bot;
})();

var deleteUser = require("./controllers/deleteUser");
var deleteOrder = require("./controllers/deleteOrder");
var updateOrderStatus = require("./controllers/updateOrderStatus");

app.use("/user", deleteUser);
app.use("/order", deleteOrder);
app.use("/patch", updateOrderStatus);
