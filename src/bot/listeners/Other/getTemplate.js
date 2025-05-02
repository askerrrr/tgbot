var { InputFile } = require("grammy");

var getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    try {
      var filePath = "src/bot/utils/template.xlsx";

      await ctx.replyWithDocument(new InputFile(filePath));
    } catch (e) {
      e.userId = ctx.chat.id;

      if (e.code == "ENOENT") {
        await ctx.reply(
          "По какой-то причине не удалось отправить вам файл.\nЯ уже уведомил моего администратора об этой ошибке"
        );

        throw e;
      }

      throw e;
    }
  });
};

module.exports = { getTemplate };
