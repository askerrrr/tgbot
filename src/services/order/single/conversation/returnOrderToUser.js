var { descCheck } = require("../../services/checkDescriptionStructure");
var { keyboardForСheckingOrder } = require("../../../../keyboard/keyboard");

module.exports.returnOrderToUser = async (
  ctx,
  url,
  phone,
  imageId,
  description
) => {
  description = descCheck(description);
  var wrappedUrl = `<u><a href="${url}" target="_blank">ссылка</a></u>`;

  await ctx.reply(`${description}\nТелефон: ${phone}\nСсылка: ${wrappedUrl}`, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  await ctx.replyWithPhoto(imageId);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingOrder,
  });
};
