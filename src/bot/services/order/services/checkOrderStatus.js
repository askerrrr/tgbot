var { logger } = require("../../../../logger");
var { reportError } = require("../../../errReportBot");
var { dbServices } = require("../../../../database/db");
var { sendOrderToAdmin } = require("./sendOrderToAdmin");
var { errNotification } = require("../../../utils/text");
var { sendOrderToServer } = require("./sendOrderToServer");
var { replyOrderSuccessMessage } = require("./replyOrderSuccessMessage");

var checkOrderStatus = async (ctx, conversation, order, fileId, orderFunc) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      var db = await dbServices();
      
      var successfulResponse = await sendOrderToServer(order);

      var isOrderAdded = await db.createOrder(order);

      if (!successfulResponse || !isOrderAdded) {
        await db.deleteOrder(order.userId, order.id);
        return await ctx.reply(errNotification);
      }

      await replyOrderSuccessMessage(ctx, order.id);

      return await sendOrderToAdmin(ctx, order, fileId);
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
