var { env } = require("../../env");
var { reportError } = require("../../errReportBot");

var getOrdersFromMainServer = async (userId) => {
  var url = env.bot_api_status + "/" + userId;

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
    var err = await response.text();
    await reportError(userId, err, "Запрос на получение заказов");
    return;
  }

  var json = await response.json();

  return json;
};

module.exports = { getOrdersFromMainServer };
