var { dbServices } = require("../../../database/db");
var { keyboard } = require("../../keyboard/keyboard");
var getUserData = require("../../services/different/getUserData");
var sendUserDataToServer = require("../../services/different/sendUserDataToServer");

var personalAccount = async (bot) => {
  bot.hears("Личный кабинет", async (ctx) => {
    try {
      var db = await dbServices();

      var user = await db.getUserById(ctx.chat.id + "");

      if (!user) {
        var userData = await getUserData(ctx.chat);

        await db.createUser(userData);

        await sendUserDataToServer(userData);
      }

      await ctx.reply("Личный кабинет", {
        reply_markup: keyboard.PersonalAccount,
      });
    } catch (e) {
      await ctx.reply(
        "Что то не могу открыть личный кабинет, попробуйте позже"
      );

      throw e;
    }
  });
};

module.exports = { personalAccount };
