var { showOrder } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var { getOrders } = require("../../services/different/getOrders");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.getCompletedOrders = async (bot) => {
  bot.hears("Завершенные заказы", async (ctx) => {
    var userId = ctx.chat.id;

    var currentCompleted = await findOrder(userId).then((order) =>
      order.completed()
    );

    if (!currentCompleted || currentCompleted.length < 1) {
      await ctx.reply("Завершенных заказов не найдено");
    }

    var orders = await getOrders(userId);
    var completed = orders?.completedOrders;

    if (!orders || completed.length < 1) {
      await currentCompleted.forEach(
        async (orders) => await ctx.reply(showOrder(orders.order, userId))
      );
    }

    await Promise.all(
      completed.map(async (order) => await updateOrderStatus(ctx, order))
    );

    return completed.map(async (order) => await ctx.reply(showOrder(order)));
  });
};
