var { Bot } = require("grammy");
var { env } = require("./env.js");
var { errorHandler } = require("./middleware/errorHandler.js");
var { getDateAndTime } = require("./services/order/services/dateAndTime.js");

var errorBot = new Bot(env.err_bot_token);

var reportError = async (userId, err, location) => {
  var errReport =
    "Ошибка у пользователя: " +
    userId +
    "\n\nОшибка: " +
    err +
    "\n\nЛокация ошибки: " +
    location +
    "\n\nВремя ошибки: " +
    getDateAndTime().fullDateTime();

  await errorBot.api.sendMessage(env.admin_id_2, errReport);
};

module.exports = { reportError };

errorBot.catch(errorHandler);
