var { checkUrl } = require("../../services/checkUrl");
var { reportError } = require("../../../../errReportBot");

var getUrl = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на товар", {
      reply_markup: { remove_keyboard: true },
    });

    var message = await conversation.wait();

    var url = message.msg.text;

    var validUrl = await checkUrl(url);

    if (!validUrl) {
      await ctx.reply("Какая-то неправильная ссылка");
      return;
    }

    return validUrl;
  } catch (err) {
    await reportError(ctx.chat.id, err, "Заказ товаров, получение ссылки");
  }
};

module.exports = { getUrl };
