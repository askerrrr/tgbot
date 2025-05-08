var env = require("../../../env");
var { NetworkError } = require("../../customError");

var sendUserDataToServer = async (userData) => {
  try {
    var res = await fetch(env.bot_api_users, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (res.status == 409) {
      return true;
    }

    if (!res.ok) {
      throw new NetworkError(userData.userId, res.statusText, res.status);
    }

    return true;
  } catch (e) {
    e.origin = sendUserDataToServer.name;

    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userData.userId, e.message);
  }
};

module.exports = sendUserDataToServer;
