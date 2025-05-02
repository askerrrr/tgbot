var env = require("../env");
var express = require("express");
var errorHandler = require("./middleware/errorHandler");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  app.listen(env.PORT, env.HOST, () =>
    console.log("The server running on " + env.HOST + ":" + env.PORT)
  );
})();

var deleteUser = require("./controllers/deleteUser");
var deleteOrder = require("./controllers/deleteOrder");
var updateOrderStatus = require("./controllers/updateOrderStatus");

app.delete("/user", deleteUser);
app.delete("/order", deleteOrder);
app.patch("/orderstatus", updateOrderStatus);

app.use(errorHandler);
