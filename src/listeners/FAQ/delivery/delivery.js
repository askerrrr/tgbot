var { backToFAQ } = require("./backToFAQ");
var { deliveryCost } = require("./deliveryCost");
var { deliveryTime } = require("./deliveryTime");
var { deliveryAddress } = require("./deliveryAdress");
var { keyboard } = require("../../../keyboard/keyboard");

var delivery = async (bot) => {
  bot.hears("Доставка", async (ctx) => {
    await ctx.reply("Вот варианты", {
      reply_markup: keyboard.Delivery,
    });
  });

  backToFAQ(bot);
  deliveryCost(bot);
  deliveryTime(bot);
  deliveryAddress(bot);
};

module.exports = { delivery };
