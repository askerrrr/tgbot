var { GrammyError, HttpError } = require("grammy");

module.exports.errorHandler = async (err) => {
  var ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  var e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
};
