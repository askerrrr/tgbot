var env = require("../env.js");
var { Bot } = require("grammy");
var { logger } = require("../logger.js");
var { errorHandler } = require("./middleware/errorHandler.js");
var { getDateAndTime } = require("./services/order/services/dateAndTime.js");

var errorBot = new Bot(env.err_bot_token);

var getErrorDetail = (err) => {
  var code = err?.code ?? "";
  var msg = err?.message ?? "";
  var location = err?.location ?? "";

  return "\n  код: " + code + "\n  текст: " + msg + "\n  место: " + location;
};

var reportError = async (userId, err) => {
  var userData = "Ошибка у пользователя: " + userId;

  var errDetail = "\n\nОшибка:  " + getErrorDetail(err);

  var errDate = "\n\nВремя ошибки: " + getDateAndTime().fullDateTime();

  var report = userData + errDetail + errDate;

  logger.error({ userId, err });
  return await errorBot.api.sendMessage(env.admin_id_2, report);
};

module.exports = { reportError };

errorBot.catch(errorHandler);
