var { Bot } = require("grammy");
var { env } = require("./env.js");
var { mainMenu } = require("./commands/mainMenu.js");
var { allListeners } = require("./listeners/allLinteners.js");
var { setCommands } = require("./commands/setCommands.js");
var { errorHandler } = require("./middleware/errorHandler.js");
var { middlewareForConversations } = require("./middleware/middleware.js");

var bot = new Bot(env.main_bot_token);

setCommands(bot);
bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForConversations(bot);

bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
