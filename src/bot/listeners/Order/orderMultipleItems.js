var orderMultipleItems = async (bot) =>
  await bot.hears("Заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multiple");
  });

module.exports = { orderMultipleItems };
