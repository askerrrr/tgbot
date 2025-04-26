var { dbServices } = require("../../../database/db");
var { keyboard } = require("../../keyboard/keyboard");
var getUserData = require("../../services/different/getUserData");
var sendUserDataToServer = require("../../services/different/sendUserDataToServer");

var personalAccount = async (bot) => {
  bot.hears("Личный кабинет", async (ctx) => {
    var db = await dbServices();

    var user = await db.getUserById(ctx.chat.id + "");

    if (!user) {
      var userData = await getUserData(ctx.chat);

      await db.createUser(userData);

      await sendUserDataToServer(userData);
    }

    await await ctx.reply("Личный кабинет", {
      reply_markup: keyboard.PersonalAccount,
    });
  });
};

module.exports = { personalAccount };
