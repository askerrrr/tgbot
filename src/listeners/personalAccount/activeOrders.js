var { showOrder } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var { addOrders } = require("../../database/services/addOrders");
var { getOrders } = require("../../services/different/getOrders");
var { addNewUser } = require("../../database/services/addNewUser");

module.exports.getActiveOrders = async (bot) => {
  bot.hears("Активные заказы", async (ctx) => {
    var userId = ctx.chat.id + "";

    var activeOrders = await findOrder(userId).then((order) => order.active());

    if (activeOrders?.length) {
      await activeOrders.forEach(
        async (orders) => await ctx.reply(showOrder(orders.order, userId))
      );

      return;
    } else {
      var requestedOrders = await getOrders(userId);
      var requestedActiveOrders = requestedOrders?.activeOrders;

      if (requestedActiveOrders.length) {
        requestedActiveOrders.forEach(
          async (order) => await ctx.reply(showOrder(order))
        );

        var data = requestedActiveOrders[0];

        await addNewUser(data.userId, data.firstName, data.userName, []);

        await Promise.all(
          requestedActiveOrders.map(async (order) => await addOrders(order))
        );
      } else {
        await ctx.reply("Активных заказов не найдено");
        return;
      }
    }
  });
};
