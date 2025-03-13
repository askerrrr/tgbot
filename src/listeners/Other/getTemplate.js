var { InputFile } = require("grammy");

var getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.replyWithDocument(new InputFile("src/utils/template.xlsx"));
  });
};

module.exports = { getTemplate };
