var { env } = require("../../../env");
var { makeOrderNotification } = require("./makeOrderNotification");

module.exports.sendOrderToAdmin = async (ctx, order, fileId) => {
  try {
    var messageToAdmin = makeOrderNotification(order);

    if (order?.type == "single") {
      await ctx.api.sendMessage(env.admin_id, messageToAdmin);
      await ctx.api.sendPhoto(env.admin_id, fileId);
    } else {
      await ctx.api.sendMessage(env.admin_id, messageToAdmin);
      await ctx.api.sendDocument(env.admin_id, fileId);
    }
  } catch (err) {
    console.log(err);
  }
};
