var { InputFile } = require("grammy");
var { noTemplateFileMessage } = require("../../utils/text");

var getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    try {
      var filePath = "src/utils/template.xlsx";

      await ctx.replyWithDocument(new InputFile(filePath));
    } catch (e) {
      await ctx.reply(noTemplateFileMessage);

      e.userId = ctx.chat.id;

      throw e;
    }
  });
};

module.exports = { getTemplate };
