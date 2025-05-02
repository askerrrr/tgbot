var env = require("../../../../env");
var { makeOrderNotification } = require("./makeOrderNotification");

var sendOrderToAdmin = async (ctx, order, fileId) => {
  var messageToAdmin = makeOrderNotification(order);

  if (order.type == "single") {
    await ctx.api.sendMessage(env.admin_id, messageToAdmin);
    await ctx.api.sendPhoto(env.admin_id, fileId);
  }

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, fileId);
};

module.exports = { sendOrderToAdmin };
