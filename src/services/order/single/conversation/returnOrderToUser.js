var { wrappUrl } = require("../../services/wrappUrl");
var { checkDescription } = require("../../services/checkDescription");
var { keyboardForСheckingOrder } = require("../../../../keyboard/keyboard");

var returnOrderToUser = async (ctx, url, phone, imageId, description) => {
  description = checkDescription(description);
  var wrappedUrl = wrappUrl(url);

  await ctx.reply(`${description}\nТелефон: ${phone}\nСсылка: ${wrappedUrl}`, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  await ctx.replyWithPhoto(imageId);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingOrder,
  });
};

module.exports = { returnOrderToUser };
