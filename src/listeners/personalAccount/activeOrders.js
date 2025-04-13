var { showOrder } = require("./showOrderContent");
var { createOrder } = require("../../database/services/createOrder");
var {
  getActiveOrdersFromDB,
} = require("../../database/services/getActiveOrdersFromDB");
var {
  getOrdersFromMainServer,
} = require("../../services/different/getOrdersFromMainServer");

var getActiveOrders = async (bot) => {
  bot.hears("Активные заказы", async (ctx) => {
    var userId = ctx.chat.id + "";

    var activeOrders = await getActiveOrdersFromDB(userId);

    if (activeOrders?.length) {
      for (var order of activeOrders) {
        await ctx.reply(showOrder(order));
      }
    } else {
      var requestedOrders = await getOrdersFromMainServer(userId);
      var requestedActiveOrders = requestedOrders?.activeOrders || [];

      if (requestedActiveOrders.length) {
        for (var order of requestedActiveOrders) {
          await ctx.reply(showOrder(order));
          await createOrder(order);
        }
      }

      return await ctx.reply("Активных заказов не найдено");
    }
  });
};

module.exports = { getActiveOrders };
