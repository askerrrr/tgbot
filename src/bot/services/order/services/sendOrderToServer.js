var env = require("../../../../env");
var { NetworkError } = require("../../../customError/index");

var sendOrderToServer = async (order) => {
  try {
    var res = await fetch(env.bot_api_order, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (!res.ok) {
      throw new NetworkError(order.userId, res.status, "sendOrderToServer");
    }

    return true;
  } catch (e) {
    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(order.userId, null, "sendOrderToServer", e);
  }
};

module.exports = { sendOrderToServer };
