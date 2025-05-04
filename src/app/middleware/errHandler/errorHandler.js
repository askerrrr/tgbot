var { reportError } = require("../../../bot/errReportBot");
var { AppError, getErrorDetail } = require("../../customError");

var errorHandler = async (e, req, res, next) => {
  var errDetail;
  console.log(e);

  if (e instanceof AppError) {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, e.userId);

    return res.sendStatus(500);
  } else {
    errDetail = getErrorDetail(e);

    await reportError(errDetail, "");

    return res.sendStatus(500);
  }
};

module.exports = errorHandler;
