module.exports.orderMultipleItems = async (bot) => {
  bot.hears("Заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multiple");
  });
};

//export to src\middleware\middleware.js
