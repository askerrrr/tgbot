var { InputFile } = require("grammy");
var { reportError } = require("../../errReportBot");

var getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    try {
      return await ctx.replyWithDocument(
        new InputFile("src/utils/template.xlsx")
      );
    } catch (err) {
      await ctx.reply(
        "По какой-то причине не удалось отправить вам файл.\nЯ уже уведомил моего администратора об этой ошибке"
      );

      return await reportError(ctx.chat.id, err, "Отправка эксель шаблона");
    }
  });
};

module.exports = { getTemplate };
