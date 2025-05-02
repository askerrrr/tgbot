var { reportError } = require("../errReportBot");

var { session } = require("grammy");
var { chatMember } = require("../chatMember/chatMember");
var { single } = require("../services/order/single/single");
var { orderCost } = require("../listeners/MainMenu/orderCost");
var { multiple } = require("../services/order/multiple/multiple");
var { catchUnexpectedMessages } = require("./unexpectedMessages");
var { calcOrderCost } = require("../services/orderCost/calcOrderCost");
var { orderSingleItems } = require("../listeners/Order/orderSilgleItem");
var { orderMultipleItems } = require("../listeners/Order/orderMultipleItems");
var { conversations, createConversation } = require("@grammyjs/conversations");

var middlewareForConversations = async (bot) => {
  try {
    await chatMember(bot);

    bot.use(session({ initial: () => ({}) }));
    bot.use(conversations());

    bot.use(createConversation(single));
    bot.use(createConversation(multiple));
    bot.use(createConversation(calcOrderCost));

    await orderCost(bot);
    await orderSingleItems(bot);
    await orderMultipleItems(bot);

    await bot.on("message", catchUnexpectedMessages);
  } catch (err) {
    console.log("err in middleware: ", err.message);
    return await reportError(err);
  }
};

module.exports = { middlewareForConversations };
