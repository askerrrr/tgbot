var env = require("../../../env");
var { reportError } = require("../../errReportBot");

var getOrdersFromMainServer = async (userId) => {
  var url = env.bot_api_orders + userId;

  try {
    var response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (response.status == 404) {
      return;
    }

    if (!response.ok) {
      var err = new Error(response.statusText);
      err.code = response.status;
      throw err;
    }

    var json = await response.json();

    return json;
  } catch (err) {
    if (err.message.startsWith("Unexpected token")) {
      return;
    }

    await reportError(userId, err, "Запрос на получение заказов");
    return;
  }
};

module.exports = getOrdersFromMainServer;
