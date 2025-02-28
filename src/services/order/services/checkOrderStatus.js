var { sendOrderToServer } = require("./sendOrderToServer");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  order,
  fileId,
  orderFunc
) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(
        `Спасибо, скоро мы свяжемся с вами для подтверждения и оплаты заказа и начнем обрабатывать его.\nID вашего заказа : ${order.id}\n\nОтслеживайте статус заказа в разделе 'Другое => Личный кабинет => Активные заказы'\n\nТекущий статус заказа:\n\nНе взят в обработку`,
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
      return await sendOrderToServer(order, ctx, fileId);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
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
