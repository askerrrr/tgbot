var { keyboard } = require("../../keyboard/keyboard");

var backToMainMenu = async (bot) => {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboard.MainMenu,
    });
  });
};

module.exports = { backToMainMenu };
