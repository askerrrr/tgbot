var { logger } = require("../../../logger");
var { reportError } = require("../../../errReportBot");
var { sendOrderToAdmin } = require("./sendOrderToAdmin");
var { errNotification } = require("../../../utils/text");
var { sendOrderToServer } = require("./sendOrderToServer");
var { showOrderSuccessMessage } = require("./showOrderSuccessMessage");
var { dbServices } = require("../../../database/db");

var checkOrderStatus = async (ctx, conversation, order, fileId, orderFunc) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(showOrderSuccessMessage(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      var db = await dbServices();

      var successfulResponse = await sendOrderToServer(order);

      var isOrderAdded = await db.createOrder(order);

      if (successfulResponse && isOrderAdded) {
        return await sendOrderToAdmin(ctx, order, fileId);
      }

      return await ctx.reply(errNotification);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      return await orderFunc(conversation, ctx);
    }
  } catch (err) {
    logger.error({ place: "check order status", userId: order.userId, err });
    reportError(order.useId, err, "Ошибка при отправлении заказа");
  }
};

module.exports = { checkOrderStatus };
