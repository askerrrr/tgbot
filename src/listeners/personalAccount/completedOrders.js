var { showOrder } = require("./showOrderContent");
var { addOrders } = require("../../database/services/addOrders");
var { findOrder } = require("../../database/services/findOrder");
var { addNewUser } = require("../../database/services/addNewUser");
var {
  getOrdersFromMainServer,
} = require("../../services/different/getOrdersFromMainServer");

module.exports.getCompletedOrders = async (bot) => {
  bot.hears("Завершенные заказы", async (ctx) => {
    var userId = ctx.chat.id + "";

    var completedOrders = await findOrder(userId).then((order) =>
      order.completed()
    );

    if (completedOrders?.length) {
      await completedOrders.forEach(
        async (elem) => await ctx.reply(showOrder(elem.order))
      );
    } else {
      var requestedOrders = await getOrdersFromMainServer(userId);
      var requestedCompletedOrders = requestedOrders?.completedOrders;

      if (requestedCompletedOrders?.length) {
        requestedCompletedOrders.forEach(
          async (order) => await ctx.reply(showOrder(order))
        );

        var data = requestedCompletedOrders[0];

        await addNewUser(data.userId, data.firstName, data.userName, []);

        await Promise.all(
          requestedCompletedOrders.map(async (order) => await addOrders(order))
        );
      } else {
        await ctx.reply("Завершенных заказов не найдено");
        return;
      }
    }
  });
};
