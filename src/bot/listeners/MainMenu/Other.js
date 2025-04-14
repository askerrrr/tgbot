var { keyboard } = require("../../keyboard/keyboard");

var other = async (bot) => {
  bot.hears("Другое", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboard.OtherQueries,
    });
  });
};

module.exports = { other };
