var { InputFile } = require("grammy");

var getTemplate = async (bot) => {
  bot.hears("Получить шаблон", async (ctx) => {
    try {
      await ctx.replyWithDocument(new InputFile("src/utils/template.xlsx"));
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

