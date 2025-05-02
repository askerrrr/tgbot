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

    if (!res.ok) {
      throw new NetworkError(userData.userId, res.status, "init user");
    }

    if (res.status == 409) {
      return true;
    }

    return true;
  } catch (e) {
    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userData.userId, null, "init user", e);
  }
};

module.exports = sendUserDataToServer;
