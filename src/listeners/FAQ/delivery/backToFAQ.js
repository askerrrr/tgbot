var { keyboard } = require("../../../keyboard/keyboard");

var backToFAQ = async (bot) => {
  bot.hears("Назад к вопросам", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: keyboard.FAQ,
    });
  });
};

module.exports = { backToFAQ };
