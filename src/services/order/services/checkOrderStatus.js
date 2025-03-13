var { sendOrderToAdmin } = require("./sendOrderToAdmin");
var { errNotification } = require("../../../utils/text");
var { sendOrderToServer } = require("./sendOrderToServer");
var { showOrderSuccessMessage } = require("./showOrderSuccessMessage");
var { addNewOrder } = require("../../../database/services/addNewOrder");

var checkOrderStatus = async (ctx, order, fileId, orderFunc, conversation) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(showOrderSuccessMessage(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      var successfulResponse = await sendOrderToServer(order);
      var isOrderAdded = await addNewOrder(order);

      if (successfulResponse && isOrderAdded) {
        await sendOrderToAdmin(ctx, order, fileId);
        return;
      }

      await ctx.reply(errNotification);
      return;
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await orderFunc(conversation, ctx);
    }
  } catch (err) {
    reportError(order.useId, err, "Ошибка при отправлении заказа");
  }
};

module.exports = { checkOrderStatus };
