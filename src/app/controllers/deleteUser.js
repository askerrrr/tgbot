var { dbServices } = require("../../database/db");
var { DeleteUserError } = require("../customError/index");
var validateAuthHeader = require("../services/validateAuthHeader");

var deleteUser = async (req, res, next) => {
  try {
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

    var user = await db.getUserById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    var isUserDeleted = await db.deleteUser(userId);

    if (!isUserDeleted) {
      throw new DeleteUserError();
    }

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteUser;
