var { env } = require("../../../env");
var { reportError } = require("../../../errReportBot");

module.exports.sendOrderToServer = async (order) => {
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
      return;
    } else {
      return true;
    }
  } catch (err) {
    await reportError(order.useId, err, "Ошибка при отправлении заказа");
  }
};
