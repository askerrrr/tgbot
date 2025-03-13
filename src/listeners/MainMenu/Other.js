var { keyboard } = require("../../keyboard/keyboard");

module.exports.other = async (bot) => {
  bot.hears("Другое", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboard.OtherQueries,
    });
  });
};
