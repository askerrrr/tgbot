var { keyboardForTheMainMenu } = require("../keyboard/keyboard");

module.exports.mainMenu = async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: keyboardForTheMainMenu,
  });
};
