var { keyboardForDownloadingApp } = require("../../keyboard/keyboard");

module.exports.downloadApp = async (bot) => {
  bot.hears("Скачать приложения", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });
};
