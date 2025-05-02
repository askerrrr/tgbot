var env = require("../env");
var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () =>
  app.listen(env.PORT, env.HOST, () =>
    console.log("The server running on " + env.HOST + ":" + env.PORT)
  ))();

app.delete("/user", require("./controllers/deleteUser"));
app.delete("/order", require("./controllers/deleteOrder"));
app.patch("/orderstatus", require("./controllers/updateOrderStatus"));

app.use(require("./middleware/errHandler/errorHandler"));
