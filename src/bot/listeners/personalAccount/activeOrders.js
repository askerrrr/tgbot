var { dbServices } = require("../../../database/db");
var { showOrder } = require("../../services/different/showOrderContent");
var getOrdersFromMainServer = require("../../services/different/getOrdersFromMainServer");

var getActiveOrders = async (bot) => {
  bot.hears("Активные заказы", async (ctx) => {
    try {
      var userId = ctx.chat.id + "";

      var db = await dbServices();

      var activeOrders = await db.getActiveOrdersFromDB(userId);

      if (activeOrders?.length) {
        for (var order of activeOrders) {
          await ctx.replyWithHTML(showOrder(order));
        }

        return;
      }

      try {
        var orders = await getOrdersFromMainServer(userId);

        var requestedActiveOrders = orders?.activeOrders || [];

        if (requestedActiveOrders.length) {
          for (var order of requestedActiveOrders) {
            await ctx.replyWithHTML(showOrder(order));

            await db.createOrder(order);
          }

          return;
        }

        return await ctx.reply("Активных заказов не найдено");
      } catch (e) {
        await ctx.reply("Активных заказов не найдено");

        throw e;
      }
    } catch (e) {
      await ctx.reply(
        "Произошла ошибка при получении активных заказов, попробуйте позже..."
      );

      throw e;
    }
  });
};

module.exports = { getActiveOrders };
