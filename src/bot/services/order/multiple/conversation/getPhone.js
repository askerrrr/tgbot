var { reportError } = require("../../../../errReportBot");

var getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Напишите номер вашего телефона без пробелов, скобок и дефисов"
    );

    var message = await conversation.wait();
    var phone = message.msg.text;

    if (phone.length == 11 && +phone) {
      return phone;
    } else {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return;
    }
  } catch (err) {
    await reportError(
      ctx.chat.id,
      err,
      "Заказ товаров, получение  телефона (multiple)"
    );
  }
};

module.exports = { getPhone };
