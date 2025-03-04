var { env } = require("../../env");
var { reportError } = require("../../errReportBot");
var { addNewUser } = require("../../database/services/addNewUser");

module.exports.sendUserDataToServer = async (userData) => {
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
      var err = await response.text();

      console.log("err: ", err);
      await reportError(
        null,
        userData.userId,
        err,
        "Отправка данных о пользователе"
      );
      return;
    }

    await addNewUser(userData);
  } catch (err) {
    console.error("Failed to send user data to server:", err);
    throw err;
  }
};
