var { dbServices } = require("../../../database/db");
var { showOrder } = require("../../services/different/showOrderContent");
var getOrdersFromMainServer = require("../../services/different/getOrdersFromMainServer");

var getCompletedOrders = async (bot) => {
  bot.hears("Завершенные заказы", async (ctx) => {
    try {
      var userId = ctx.chat.id + "";

      var db = await dbServices();

      var completedOrders = await db.getCompletedOrdersFromDB(userId);

      if (completedOrders?.length) {
        for (var order of completedOrders) {
          await ctx.replyWithHTML(showOrder(order));
        }

        return;
      }

      var orders = await getOrdersFromMainServer(userId);

      var requestedCompletedOrders = orders?.completedOrders || [];

      if (requestedCompletedOrders.length) {
        for (var order of requestedCompletedOrders) {
          await ctx.replyWithHTML(showOrder(order));

          await db.createOrder(order);
        }

        return;
      }

      return await ctx.reply("Завершенных заказов не найдено");
    } catch (e) {
      await ctx.reply(
        "Произошла ошибка при получении завершенных заказов, попробуйте позже..."
      );

      throw e;
    }
  });
};

module.exports = { getCompletedOrders };
