var { dbServices } = require("../../database/db");
var getUserData = require("../services/different/getUserData");
var { greetUser } = require("../services/different/greetUser");
var sendUserDataToServer = require("../services/different/sendUserDataToServer");

var chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    try {
      var userData = await getUserData(ctx.chat);

      var db = await dbServices();

      var successCreateUser = await db.createUser(userData);
      var successResponse = await sendUserDataToServer(userData);

      if (!successCreateUser || !successResponse) {
        return ctx.reply("Произошла ошибка, попробуйте позже");
      }

      await ctx.reply(greetUser(ctx.chat.id, ctx.chat.first_name));
    } catch (err) {
      err.userId = ctx.chat.id;
      err.location = "create and send new user data";

      throw err;
    }
  });
};

module.exports = { chatMember };
