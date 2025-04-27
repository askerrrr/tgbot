var { dbServices } = require("../../database/db");
var getUserData = require("../services/different/getUserData");
var { greetUser } = require("../services/different/greetUser");
var sendUserDataToServer = require("../services/different/sendUserDataToServer");

var chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    await ctx.reply(greetUser(ctx.chat.id, ctx.chat.first_name));

    var userData = await getUserData(ctx.chat);

    var db = await dbServices();

    await db.createUser(userData);
    await sendUserDataToServer(userData);
  });
};

module.exports = { chatMember };
