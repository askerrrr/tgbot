var { chatMembers } = require("@grammyjs/chat-members");
var { chatMember } = require("../chatMember/chatMember");
var { session, MemorySessionStorage } = require("grammy");
var { single } = require("../services/order/single/single");
var { orderCost } = require("../listeners/MainMenu/orderCost");
var { multiple } = require("../services/order/multiple/multiple");
var { catchUnexpectedMessages } = require("./unexpectedMessages");
var { calcOrderCost } = require("../services/orderCost/calcOrderCost");
var { orderSingleItems } = require("../listeners/Order/orderSilgleItem");
var { orderMultipleItems } = require("../listeners/Order/orderMultipleItems");
var { conversations, createConversation } = require("@grammyjs/conversations");

//
//
//

var adapter = new MemorySessionStorage();

module.exports.middlewareForConversations = async (bot) => {
  bot.use(chatMembers(adapter));
  chatMember(bot);

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());

  bot.use(createConversation(single));
  bot.use(createConversation(multiple));
  bot.use(createConversation(calcOrderCost));

  orderCost(bot);
  orderSingleItems(bot);
  orderMultipleItems(bot);

  bot.on("message", catchUnexpectedMessages);
};
