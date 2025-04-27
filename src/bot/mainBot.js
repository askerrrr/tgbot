var env = require("../env.js");
var { Bot } = require("grammy");
var { mainMenu } = require("./commands/mainMenu.js");
var { hydrateReply } = require("@grammyjs/parse-mode");
var { setCommands } = require("./commands/setCommands.js");
var { allListeners } = require("./listeners/allLinteners.js");
var { errorHandler } = require("./middleware/errorHandler.js");
var { middlewareForConversations } = require("./middleware/middleware.js");

var bot = new Bot(env.main_bot_token);

setCommands(bot);

bot.use(hydrateReply);

bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForConversations(bot);

bot.catch(errorHandler);

bot.start();
