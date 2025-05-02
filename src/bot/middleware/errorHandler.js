var { reportError } = require("../errReportBot");
var { GrammyError, HttpError } = require("grammy");
var { NetworkError, DatabaseError } = require("../customError");
var getErrorDetail = require("../services/different/getErrorDetail");
var getNetworkErrorDetail = require("../services/different/getNetworkErrorDetail");
var getDatabaseErrorDetail = require("../services/different/getDatabaseErrorDetail");

var errorHandler = async (err) => {
  var e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else if (e instanceof TypeError) {
    console.error("TypeError:", e);
  } else if (e instanceof NetworkError) {
    var errDetail = getNetworkErrorDetail(e);

    return await reportError(errDetail, e.userId);
  } else if (e instanceof DatabaseError) {
    var errDetail = getDatabaseErrorDetail(e);

    return await reportError(errDetail, e.userId);
  } else if (e instanceof Error) {
    var errDetail = getErrorDetail(e);
    return await reportError(errDetail, e.userId);
  }
};

module.exports = { errorHandler };
