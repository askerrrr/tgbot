var orderSingleItems = async (bot) =>
  await bot.hears("Заказать один товар", async (ctx) => {
    await ctx.conversation.enter("single");
  });

module.exports = { orderSingleItems };
