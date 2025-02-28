var { keyboardForFAQ } = require("../../../keyboard/keyboard");

module.exports.backToFAQ = async (bot) => {
  bot.hears("Назад к вопросам", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: keyboardForFAQ,
    });
  });
};
