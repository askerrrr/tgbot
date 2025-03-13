var { deliveryTimeText } = require("../../../utils/text");

var deliveryTime = async (bot) => {
  bot.hears("Сроки доставки", async (ctx) => {
    await ctx.reply(deliveryTimeText);
  });
};

module.exports = { deliveryTime };
