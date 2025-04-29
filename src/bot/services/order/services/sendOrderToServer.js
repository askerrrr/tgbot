var { logger } = require("../../../../logger");
var env = require("../../../../env");
var { reportError } = require("../../../errReportBot");

var sendOrderToServer = async (order) => {
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
      var err = new Error(response.statusText);
      err.code = response.status;
      throw err;
    }

    return true;
  } catch (err) {
    logger.error({
      place: "отправлении заказа на сервер",
      userId: order.userId,
      err,
    });
    await reportError(order.useId, err, "Ошибка при отправлении заказа");
  }
};

module.exports = { sendOrderToServer };
