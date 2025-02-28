var { backToFAQ } = require("./backToFAQ");
var { deliveryCost } = require("./deliveryCost");
var { deliveryTime } = require("./deliveryTime");
var { deliveryAddress } = require("./deliveryAdress");
var { keyboardForDelivery } = require("../../../keyboard/keyboard");

module.exports.delivery = async (bot) => {
  bot.hears("Доставка", async (ctx) => {
    await ctx.reply("Вот варианты", {
      reply_markup: keyboardForDelivery,
    });
  });

  backToFAQ(bot);
  deliveryCost(bot);
  deliveryTime(bot);
  deliveryAddress(bot);
};
