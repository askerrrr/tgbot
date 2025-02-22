var { sendOrderToServer } = require("./sendOrderToServer");
var { printOrderConfirmation } = require("../../../utils/text");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  order,
  fileId,
  orderFunc
) => {
  try {
    var orderStatus = await conversation.wait();

    if (orderStatus.msg.text == "Да, все правильно!") {
      await ctx.reply(printOrderConfirmation(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      return await sendOrderToServer(order, ctx, fileId);
    } else if (
      orderStatus.msg.text == "Нет, тут ошибка, я хочу исправить данные"
    ) {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      return await orderFunc(conversation, ctx);
    }
  } catch (err) {
    console.log(err);
  }
};
