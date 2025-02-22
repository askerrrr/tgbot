module.exports.orderCost = async (bot) => {
  bot.hears("Рассчитать стоимость заказа", async (ctx) => {
    await ctx.conversation.enter("calcOrderCost");
  });
};
