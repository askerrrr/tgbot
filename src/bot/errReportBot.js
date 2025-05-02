var env = require("../env.js");
var { Bot } = require("grammy");
var { logger } = require("../logger.js");
var { getDateAndTime } = require("./services/order/services/dateAndTime.js");

var errorBot = new Bot(env.err_bot_token);

var reportError = async (errDetail, userId) => {
  var errTitle = "Пользователь: " + userId;

  var date = "\n\nВремя ошибки: " + getDateAndTime().fullDateTime();

  var report = errTitle + date + errDetail;

  logger.error({ errDetail });

  return await errorBot.api.sendMessage(env.admin_id_2, report);
};

module.exports = { reportError };
