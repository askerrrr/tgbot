const {
  createItemStatusCollection,
} = require("../../../database/services/createItemStatusCollection");
const { downloadAndSaveFile } = require("./downloadAndSaveFile");
const { showOrderSuccessMessage } = require("./showOrderSuccessMessage");
const { createNewOrder } = require("../../../database/services/createNewOrder");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  order,
  fileId,
  orderFunc
) => {
  try {
    var status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply(showOrderSuccessMessage(order.id), {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await createNewOrder(order);
      await downloadAndSaveFile(
        order.userId,
        fileId,
        order.file.telegramApiFileUrl,
        order
      );
      await createItemStatusCollection(order);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      return await orderFunc(conversation, ctx);
    }
  } catch (err) {
    console.log(err);
  }
};
