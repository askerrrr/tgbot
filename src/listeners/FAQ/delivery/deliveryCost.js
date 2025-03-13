var { deliveryCostText } = require("../../../utils/text");

var deliveryCost = async (bot) => {
  bot.hears("Стоимость доставки", async (ctx) => {
    await ctx.reply(deliveryCostText);
  });
};

module.exports = { deliveryCost };
