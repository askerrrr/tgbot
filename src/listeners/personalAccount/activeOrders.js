var { showOrder } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var { getOrders } = require("../../services/different/getOrders");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.getActiveOrders = async (bot) => {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      var userId = ctx.chat.id;

      var currentActive = await findOrder(userId).then((order) =>
        order.active()
      );

      if (!currentActive || currentActive.length < 1)
        return await ctx.reply("Активных заказов не найдено");

      var orders = await getOrders(userId, ctx);
      var active = orders?.activeOrders;

      if (!orders || active.length < 1)
        return await currentActive.forEach(
          async (orders) => await ctx.reply(showOrder(orders.order, userId))
        );

      await Promise.all(
        active.map(async (order) => await updateOrderStatus(ctx, order))
      );

      return active.map(async (order) => await ctx.reply(showOrder(order)));
    });
  } catch (err) {
    console.error(err);
  }
};
