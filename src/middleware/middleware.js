const { chatMember } = require("../chatMember/chatMember");
const { session, MemorySessionStorage } = require("grammy");
const { chatMembers } = require("@grammyjs/chat-members");
const { singleOrder } = require("../services/order/singleOrder/singleOrder");
const { listenersForOrder } = require("../listeners/listenersForOrder");
const { catchUnexpectedMessages } = require("./unexpectedMessages");

const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const {
  multipleOrders,
} = require("../services/order/multipleOrders/multipleOrders");

//
//
//

const adapter = new MemorySessionStorage();

module.exports.middlewareForConversations = async function (bot) {
  bot.use(chatMembers(adapter));
  chatMember(bot);

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());

  bot.use(createConversation(singleOrder));
  bot.use(createConversation(multipleOrders));

  listenersForOrder(bot);

  bot.on("message", catchUnexpectedMessages);
};
