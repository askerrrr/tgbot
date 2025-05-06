var { reportError } = require("../errReportBot");
var { GrammyError, HttpError } = require("grammy");
var { customError } = require("../customError/index");
var getErrorDetail = require("../services/different/getErrorDetail");
var getCustomErrorDetail = require("../services/different/getCustomErrorDetail");

var errorHandler = async (err) => {
  var e = err.error;
  var errDetail;

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);

    return await reportError(e, null);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);

    return await reportError(e, null);
  } else if (e instanceof TypeError) {
    console.error("TypeError:", e);

    return await reportError(e, null);
  } else if (customError.some((err) => e instanceof err)) {
    errDetail = getCustomErrorDetail(e);

    return await reportError(errDetail, e.userId);
  } else if (e instanceof Error) {
    errDetail = getErrorDetail(e);

    return await reportError(errDetail, e.userId);
  }
};

module.exports = { errorHandler };
