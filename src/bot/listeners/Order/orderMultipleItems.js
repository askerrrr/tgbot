var orderMultipleItems = async (bot) => {
  bot.hears("Заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multiple");
  });
};

module.exports = { orderMultipleItems };
