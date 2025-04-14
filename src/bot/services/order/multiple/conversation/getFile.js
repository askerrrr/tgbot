var { reportError } = require("../../../../errReportBot");
var getFileUrl = require("../../services/getFileURL");
var checkDocumentExension = require("../../services/checkDocumentExension");

var getFile = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Пришлите эксель таблицу с вашими товарами\n\nПолучить шаблон можно в разделе -  /Другое/Получить шаблон",
      {
        reply_markup: { remove_keyboard: true },
      }
    );

    var { message } = await conversation.wait();

    if (message?.document) {
      var fileName = message.document.file_name;
      var mimeType = message.document.mime_type;
      var validDocumentExension = checkDocumentExension(fileName, mimeType);

      if (validDocumentExension) {
        var fileId = message.document.file_id;
        var telegramApiFileUrl = await getFileUrl(ctx, fileId);

        return { telegramApiFileUrl, fileId };
      } else {
        await ctx.reply("Это не эксель таблица, попробуйте еще раз");
        return;
      }
    }

    await ctx.reply("Это вообще не документ...");
    return;
  } catch (err) {
    await reportError(ctx.chat.id, err, "Заказ товаров, получение эксель");
  }
};

module.exports = { getFile };
