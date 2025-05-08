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
      throw new NetworkError(order.userId, res.statusText, res.status);
    }

    return true;
  } catch (e) {
    e.origin = sendOrderToServer.name;

    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(order.userId, e.message);
  }
};

module.exports = { sendOrderToServer };
