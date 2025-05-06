var { dbServices } = require("../../database/db");
var { AppError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteUser = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var validAuthHeader = await validateAuthHeader(authHeader);

  if (!validAuthHeader) {
    return res.sendStatus(403);
  }

  var db = await dbServices();

  var { userId } = req.body;

  try {
    var user = await db.getUserById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    var isUserDeleted = await db.deleteUser(userId);

    if (!isUserDeleted) {
      throw new AppError(userId);
    }

    return res.sendStatus(200);
  } catch (e) {
    e.origin = deleteUser.name;

    if (e instanceof AppError) {
      return next(e);
    }

    next(new AppError(userId, null, e));
  }
};

module.exports = deleteUser;
