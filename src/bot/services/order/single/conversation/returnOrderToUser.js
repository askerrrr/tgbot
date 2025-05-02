var { wrappUrl } = require("../../services/wrappUrl");
var { keyboard } = require("../../../../keyboard/keyboard");
var { checkDescription } = require("../../services/checkDescription");

var returnOrderToUser = async (ctx, itemUrl, phone, imageId, description) => {
  var wrappedUrl = wrappUrl(itemUrl);

  description = checkDescription(description);

  var orderData = `${description}\nТелефон: ${phone}\nСсылка: ${wrappedUrl}`;

  await ctx.replyWithHTML(orderData);

  await ctx.replyWithPhoto(imageId);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboard.СheckingOrder,
  });
};

module.exports = { returnOrderToUser };
