var { keyboard } = require("../../keyboard/keyboard");

var backToOtherMenu = async (bot) => {
  bot.hears("Назад", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboard.OtherQueries,
    });
  });
};

module.exports = { backToOtherMenu };
