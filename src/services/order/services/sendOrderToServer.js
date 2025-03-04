var { env } = require("../../../env");
var { reportError } = require("../../../errReportBot");
var { errNotification } = require("../../../utils/text");

module.exports.sendOrderToServer = async (order, ctx) => {
  try {
    var response = await fetch(env.bot_api_order, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (!response.ok) {
      var err = await response.text();

      await reportError(order.useId, err, "Ошибка при отправлении заказа");
      await ctx.reply(errNotification);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
