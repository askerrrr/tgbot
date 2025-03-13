var { keyboard } = require("../../keyboard/keyboard");

var personalAccount = async (bot) => {
  bot.hears("Личный кабинет", async (ctx) => {
    await ctx.reply("Личный кабинет", {
      reply_markup: keyboard.PersonalAccount,
    });
  });
};

module.exports = { personalAccount };
