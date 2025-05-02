var env = require("../../../env");
var { NetworkError } = require("../../customError/index");

var getOrdersFromMainServer = async (userId) => {
  var url = env.bot_api_orders + userId;

  try {
    var res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (!res.ok) {
      throw new NetworkError(userId, res.status, "getOrdersFromMainServer");
    }

    if (res.status == 404) {
      return;
    }

    var data = await res.json();

    return data;
  } catch (e) {
    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userId, null, "getOrdersFromMainServer", e);
  }
};

module.exports = getOrdersFromMainServer;
