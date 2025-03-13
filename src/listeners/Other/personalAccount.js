var { keyboard } = require("../../keyboard/keyboard");

module.exports.personalAccount = async (bot) => {
  bot.hears("Личный кабинет", async (ctx) => {
    await ctx.reply("Личный кабинет", {
      reply_markup: keyboard.PersonalAccount,
    });
  });
};
