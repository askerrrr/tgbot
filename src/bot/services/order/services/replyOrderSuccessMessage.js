var replyOrderSuccessMessage = async (ctx, orderId) => {
  var message =
    "Спасибо, скоро мы свяжемся с вами для подтверждения и оплаты заказа и начнем обрабатывать его.\nID вашего заказа: " +
    orderId +
    "\n\nОтслеживайте статус заказа в разделе 'Другое => Личный кабинет => Активные заказы'\n\nТекущий статус заказа:\n\nНе взят в обработку";

  return await ctx.reply(message, {
    reply_markup: {
      remove_keyboard: true,
    },
  });
};

module.exports = { replyOrderSuccessMessage };
