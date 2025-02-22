var { getFileUrl } = require("../../services/getFileURL");

module.exports.getFile = async (ctx, conversation) => {
  try {
    await ctx.reply(
      `Пришлите эксель таблицу с вашими товарами\n\nПолучить шаблон можно в разделе -  /Другое/Получить шаблон`,
      {
        reply_markup: { remove_keyboard: true },
      }
    );

    var { message } = await conversation.wait();

    if (message?.document) {
      var fileName = message.document.file_name;
      var mimeType = message.document.mime_type;
      var validDocType = checkDocType(fileName, mimeType);

      if (validDocType) {
        var fileId = message.document.file_id;
        var fileURL = await getFileUrl(ctx, fileId);
        return `${fileURL}::${fileId}`;
      } else {
        await ctx.reply("Это не эксель таблица, попробуйте еще раз");
        return;
      }
    }

    await ctx.reply("Это вообще не документ...");
    return;
  } catch (err) {
    console.log(err);
  }
};

var checkDocType = (fileName, mimeType) =>
  fileName.split(".").at(-1).toLowerCase() === "xlsx" &&
  mimeType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
