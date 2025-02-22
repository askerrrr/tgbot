var { keyboardForTheMainMenu } = require("../../keyboard/keyboard");

module.exports.backToMainMenu = async (bot) => {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });
};
