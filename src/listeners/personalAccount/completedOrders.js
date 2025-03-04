
module.exports.getCompletedOrders = async (bot) => {
  bot.hears("Завершенные заказы", async (ctx) => {
    var userId = ctx.chat.id;
  });
};
