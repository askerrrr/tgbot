var { deliveryCostText } = require("../../../utils/text");

module.exports.deliveryCost = async (bot) => {
  bot.hears("Стоимость доставки", async (ctx) => {
    await ctx.reply(deliveryCostText);
  });
};
