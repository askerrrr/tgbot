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

    if (res.status == 404) {
      return;
    }

    if (!res.ok) {
      throw new NetworkError(userId, res.status);
    }

    var data = await res.json();

    return data;
  } catch (e) {
    e.origin = getOrdersFromMainServer.name;

    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userId, null, e);
  }
};

module.exports = getOrdersFromMainServer;
