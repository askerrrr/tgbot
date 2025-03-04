var { Bot } = require("grammy");
var { env } = require("./env.js");
const { errorHandler } = require("./middleware/errorHandler.js");

var errorBot = new Bot(env.err_bot_token);

errorBot.hears("a", async (ctx) => {
  await ctx.reply("asfsdf");
});
module.exports.reportError = async (userId, err, location, chatId) => {
  var errMessage =
    "Ошибка у пользователя " +
    (userId ?? chatId) +
    "Ошибка: " +
    err +
    "\n\nМесто ошибки: " +
    location;
  await errorBot.api.sendMessage(env.admin_id_2, errMessage);
};

errorBot.catch(errorHandler);

errorBot.start();
