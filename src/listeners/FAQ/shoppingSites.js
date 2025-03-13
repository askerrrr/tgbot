var { shoppingSitesText } = require("../../utils/text");

var shoppingSites = async (bot) => {
  bot.hears("Маркеплейсы с которыми работаем", async (ctx) => {
    await ctx.reply(shoppingSitesText);
  });
};

module.exports = { shoppingSites };
