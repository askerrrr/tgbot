var { deliveryAddressText } = require("../../../utils/text");

module.exports.deliveryAddress = async (bot) => {
  bot.hears("Адрес доставки", async (ctx) => {
    await ctx.reply(deliveryAddressText);
  });
};
