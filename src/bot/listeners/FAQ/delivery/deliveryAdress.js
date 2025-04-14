var { deliveryAddressText } = require("../../../utils/text");

var deliveryAddress = async (bot) => {
  bot.hears("Адрес доставки", async (ctx) => {
    await ctx.reply(deliveryAddressText);
  });
};

module.exports = { deliveryAddress };
