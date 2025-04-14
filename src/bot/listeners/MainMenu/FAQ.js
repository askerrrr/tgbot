var { keyboard } = require("../../keyboard/keyboard");

var FAQ = async (bot) => {
  bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: keyboard.FAQ,
    });
  });
};

module.exports = { FAQ };
