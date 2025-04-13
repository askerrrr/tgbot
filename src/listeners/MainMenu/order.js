var { keyboard } = require("../../keyboard/keyboard");
var {
  getActiveOrdersFromDB,
} = require("../../database/services/getActiveOrdersFromDB");

var order = async (bot) => {
  bot.hears("Сделать заказ!", async (ctx) => {
    var activeOrders = await getActiveOrdersFromDB(ctx.chat.id + "");

    if (activeOrders?.length > 5) {
      await ctx.reply(
        "Вы превысили количество активных заказов.\nОдновременно вы можете иметь до 5 активных заказов.\nДля оформления заказа обратитесь к администратору."
      );

      return;
    }

    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboard.Order,
    });
  });
};

module.exports = { order };
