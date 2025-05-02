var { keyboard } = require("../../../../keyboard/keyboard");

var returnOrderToUser = async (ctx, phone, fileId) => {
  try {
    await ctx.replyWithDocument(fileId);
    await ctx.reply("Телефон : " + phone);
    await ctx.reply("Все правильно?", {
      reply_markup: keyboard.СheckingOrder,
    });
  } catch (e) {
    throw e;
  }
};

module.exports = { returnOrderToUser };
