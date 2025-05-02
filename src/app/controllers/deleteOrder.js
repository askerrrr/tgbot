var { dbServices } = require("../../database/db");
var { DeleteOrderError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteOrder = async (req, res, next) => {
  try {
    var authHeader = req.headers?.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(403);
    }

    var { userId, orderId } = req.body;

    var db = await dbServices();

    var isOrderExists = await db.checkOrderExists(userId, orderId);

    if (!isOrderExists) {
      return res.sendStatus(404);
    }

    var isOrderDeleted = await db.deleteOrder(userId, orderId);

    if (!isOrderDeleted) {
      throw new DeleteOrderError(userId, orderId);
    }

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteOrder;
