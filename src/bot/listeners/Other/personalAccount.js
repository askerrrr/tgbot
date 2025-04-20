var env = require("../../../env");
var JWT = require("jsonwebtoken");
var { keyboard } = require("../../keyboard/keyboard");

var authPersonalAccount = async (token) => {
  var response = await fetch(env.user_auth_url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return;
  }

  return true;
};

var personalAccount = async (bot) => {
  bot.hears("Личный кабинет", async (ctx) => {
    var role = "user";
    var login = ctx.chat.id;

    var token = JWT.sign({ login, role }, env.secretKey, {
      expiresIn: "1m",
    });

    var successAuth = await authPersonalAccount(token);

    if (!successAuth) {
      await ctx.reply("Произошла какая-то ошибка");
      return;
    }

    await ctx.reply("Личный кабинет", {
      reply_markup: keyboard.PersonalAccount,
    });
  });
};

module.exports = { personalAccount };
