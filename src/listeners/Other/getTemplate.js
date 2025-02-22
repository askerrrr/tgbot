var { InputFile } = require("grammy");

module.exports.getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.replyWithDocument(new InputFile("src/utils/template.xlsx"));
  });
};
