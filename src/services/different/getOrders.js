var { env } = require("../../env");
var { reportError } = require("../../errReportBot");

module.exports.getOrders = async (userId) => {
  var url = env.bot_api_status + "/" + userId;

  var response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + env.bot_secret_key,
    },
  });

  if (!response.ok) {
    var err = await response.text();
    await reportError(userId, err, "Запрос на обновление статуса");
    return;
  }

  if (response.status == 404) {
    return;
  }

  var json = await response.json();

  return json;
};
