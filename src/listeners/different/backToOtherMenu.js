var { keyboard } = require("../../keyboard/keyboard");

module.exports.backToOtherMenu = async (bot) => {
  bot.hears("Назад", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboard.OtherQueries,
    });
  });
};
