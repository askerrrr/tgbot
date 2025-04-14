var { keyboard } = require("../keyboard/keyboard");

var mainMenu = async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: keyboard.MainMenu,
  });
};

module.exports = { mainMenu };
