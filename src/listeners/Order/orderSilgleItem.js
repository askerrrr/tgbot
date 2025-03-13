var orderSingleItems = async (bot) => {
  bot.hears("Заказать один товар", async (ctx) => {
    await ctx.conversation.enter("single");
  });
};

module.exports = { orderSingleItems };
