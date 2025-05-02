var {
  getErrorDetail,
  DeleteUserError,
  DeleteOrderError,
  OrderStatusUpdateError,
} = require("../../customError");
var { reportError } = require("../../../bot/errReportBot");

var errorHandler = async (e, req, res, next) => {
  var errDetail;

  if (e instanceof OrderStatusUpdateError) {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, e.userId);

    return res.sendStatus(304);
  } else if (e instanceof DeleteUserError) {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, e.userId);

    return res.sendStatus(304);
  } else if (e instanceof DeleteOrderError) {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, e.userId);

    return res.sendStatus(304);
  } else {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, "");

    return res.sendStatus(500);
  }
};

module.exports = errorHandler;
