var { dbServices } = require("../../../database/db");
var { showOrder } = require("../../services/different/showOrderContent");
var getOrdersFromMainServer = require("../../services/different/getOrdersFromMainServer");

var getCompletedOrders = async (bot) => {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      var userId = ctx.chat.id + "";

      var db = await dbServices();

      var completedOrders = await db.getCompletedOrdersFromDB(userId);

      if (completedOrders?.length) {
        for (var order of completedOrders) {
          await ctx.reply(showOrder(order));
        }
        return;
      }

      try {
        var orders = await getOrdersFromMainServer(userId);

        var requestedCompletedOrders = orders?.completedOrders || [];

        if (requestedCompletedOrders.length) {
          for (var order of requestedCompletedOrders) {
            await ctx.reply(showOrder(order));

            await db.createOrder(order);
          }

          return;
        }
      } catch (e) {
        await ctx.reply("Завершенных заказов не найдено");
        throw e;
      }
    });
  } catch (e) {
    throw e;
  }
};

module.exports = { getCompletedOrders };
