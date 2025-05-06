var { dbServices } = require("../../database/db");
var { AppError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteOrder = async (req, res, next) => {
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

  try {
    var isOrderExists = await db.checkOrderExists(userId, orderId);

    if (!isOrderExists) {
      return res.sendStatus(404);
    }

    var isOrderDeleted = await db.deleteOrder(userId, orderId);

    if (!isOrderDeleted) {
      throw new AppError(userId, orderId);
    }

    return res.sendStatus(200);
  } catch (e) {
    e.origin = deleteOrder.name;

    if (e instanceof AppError) {
      return next(e);
    }

    next(new AppError(userId, orderId, e));
  }
};

module.exports = deleteOrder;
