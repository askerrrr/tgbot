const {
  DeleteUserError,
  DeleteOrderError,
  OrderStatusUpdateError,
} = require("../customError");

var errorHandler = async (e, req, res, next) => {
  if (e instanceof OrderStatusUpdateError) {
    return res.status(304);
  } else if (e instanceof DeleteUserError) {
    return res.sendStatus(304);
  } else if (e instanceof DeleteOrderError) {
    return res.sendStatus(304);
  } else {
    return res.sendStatus(500);
  }
};

module.exports = errorHandler;
