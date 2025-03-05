var { reportError } = require("../errReportBot");
var { GrammyError, HttpError } = require("grammy");

module.exports.errorHandler = async (err) => {
  var ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  var e = err.error;
  if (e instanceof GrammyError) {
    await reportError(ctx.chat.id, e, "Ошибка в запросе, errorHandler");
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    await reportError(ctx.chat.id, e, "Could not contact Telegram");
    console.error("Could not contact Telegram:", e);
  } else {
    await reportError(ctx.chat.id, e, "Unknown error");
    console.error("Unknown error:", e);
  }
};
