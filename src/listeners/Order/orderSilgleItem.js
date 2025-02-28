module.exports.orderSingleItems = async (bot) => {
  bot.hears("Заказать один товар", async (ctx) => {
    await ctx.conversation.enter("single");
  });
};
