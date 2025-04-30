var env = require("../../../env");
var { reportError } = require("../../errReportBot");

var sendUserDataToServer = async (userData) => {
  try {
    var response = await fetch(env.bot_api_users, {
      method: "POST",
      body: JSON.stringify(userData),
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
    await reportError(userData.userId, err, "Отправка данных пользователе");
  }
};

module.exports = sendUserDataToServer;
