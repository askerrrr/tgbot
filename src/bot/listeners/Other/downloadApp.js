var { keyboard } = require("../../keyboard/keyboard");

var downloadApp = async (bot) => {
  bot.hears("Скачать приложения", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboard.DownloadingApp,
    });
  });
};

module.exports = { downloadApp };
