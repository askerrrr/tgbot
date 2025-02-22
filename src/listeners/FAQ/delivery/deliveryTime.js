var { deliveryTimeText } = require("../../../utils/text");

module.exports.deliveryTime = async (bot) => {
  bot.hears("Сроки доставки", async (ctx) => {
    await ctx.reply(deliveryTimeText);
  });
};
