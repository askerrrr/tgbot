var { shoppingSitesText } = require("../../utils/text");

module.exports.shoppingSites = async (bot) => {
  bot.hears("Маркеплейсы с которыми работаем", async (ctx) => {
    await ctx.reply(shoppingSitesText);
  });
};
