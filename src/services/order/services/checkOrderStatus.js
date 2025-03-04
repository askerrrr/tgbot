const {
  createItemCollection,
} = require("../../../database/services/createItemCollection");
const { downloadAndSaveFile } = require("./downloadAndSaveFile");
const { showOrderSuccessMessage } = require("./showOrderSuccessMessage");
const { createNewOrder } = require("../../../database/services/createNewOrder");

module.exports.checkOrderStatus = async (ctx, order, fileId, orderFunc) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(showOrderSuccessMessage(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await createNewOrder(order);
      await downloadAndSaveFile(fileId, order);
      await createItemCollection(order);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      return await orderFunc;
    }
  } catch (err) {
    console.log(err);
  }
};
