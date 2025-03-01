var JWT = require("jsonwebtoken");
var { env } = require("../../env");

module.exports.getOrders = async (userId, ctx) => {
  var response = await fetch(env.bot_api_status + "/" + userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
        expiresIn: "5m",
      })}`,
    },
  });

  if (!response.ok) {
    var err = await response.text();
    await env.sendErrToAdmin(ctx, err, "Запрос на обновление статуса");

    return;
  }

  var json = await response.json();

  return json;
};
