var { showOrder } = require("./showOrderContent");
var { createOrder } = require("../../database/services/createOrder");
var {
  getCompletedOrdersFromDB,
} = require("../../database/services/getCompletedOrdersFromDB");
var {
  getOrdersFromMainServer,
} = require("../../services/different/getOrdersFromMainServer");

var getCompletedOrders = async (bot) => {
  bot.hears("Завершенные заказы", async (ctx) => {
    var userId = ctx.chat.id + "";

    var completedOrders = await getCompletedOrdersFromDB(userId);

    if (completedOrders?.length) {
      for (var order of completedOrders) {
        await ctx.reply(showOrder(order));
      }
    } else {
      var requestedOrders = await getOrdersFromMainServer(userId);
      var requestedCompletedOrders = requestedOrders?.completedOrders || [];

      if (requestedCompletedOrders.length) {
        for (var order of requestedCompletedOrders) {
          await ctx.reply(showOrder(order));
          await createOrder(order);
        }
      }

      return await ctx.reply("Завершенных заказов не найдено");
    }
  });
};

module.exports = { getCompletedOrders };
