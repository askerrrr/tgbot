var { sendOrderToAdmin } = require("./sendOrderToAdmin");
var { sendOrderToServer } = require("./sendOrderToServer");
var { showOrderSuccessMessage } = require("./showOrderSuccessMessage");
var { addNewOrder } = require("../../../database/services/addNewOrder");

module.exports.checkOrderStatus = async (
  ctx,
  order,
  fileId,
  orderFunc,
  conversation
) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(showOrderSuccessMessage(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await sendOrderToServer(order, ctx);
      await addNewOrder(order);
      await sendOrderToAdmin(ctx, order, fileId);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await orderFunc(conversation, ctx);
    }
  } catch (err) {
    console.log(err);
  }
};
