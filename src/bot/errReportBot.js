var env = require("../env.js");
var { Bot } = require("grammy");
var { errorHandler } = require("./middleware/errorHandler.js");
var { getDateAndTime } = require("./services/order/services/dateAndTime.js");

var errorBot = new Bot(env.err_bot_token);

var errorDetail = (err) =>
  "\n  код:  " + err.code + "\n  текст:  " + err.message;

var reportError = async (userId, err, location) => {
  var userData = "Ошибка у пользователя: " + userId;
  var errMessage = "\n\nОшибка:  " + errorDetail(err);
  var errLocation = "\n\nЛокация ошибки: " + location;
  var errDate = "\n\nВремя ошибки: " + getDateAndTime().fullDateTime();

  var report = userData + errMessage + errLocation + errDate;

  return await errorBot.api.sendMessage(env.admin_id_2, report);
};

module.exports = { reportError };

errorBot.catch(errorHandler);
