var { keyboardForOrder } = require("../../keyboard/keyboard");
var { findOrder } = require("../../database/services/findOrder");

module.exports.order = async (bot) => {
  bot.hears("Сделать заказ!", async (ctx) => {
    var activeOrders = await findOrder(ctx.chat.id).then((order) =>
      order.active()
    );

    if (activeOrders?.length > 5) {
      await ctx.reply(
        "Вы превысили количество активных заказов.\nОдновременно вы можете иметь до 5 активных заказов.\nДля оформления заказа обратитесь к администратору."
      );

      return;
    }

    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });
};
