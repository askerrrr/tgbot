var { env } = require("../../env");
var { reportError } = require("../../errReportBot");

module.exports.sendUserDataToServer = async (userData) => {
  var response = await fetch(env.bot_api_users, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.bot_secret_key,
    },
  });

  if (!response.ok) {
    var err = await response.text();
    await reportError(userData.userId, err, "Отправка данных о пользователе");

    return;
  }
};
