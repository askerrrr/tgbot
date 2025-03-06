var {
  sendUserDataToServer,
} = require("../services/different/sendUserDataToServer");
var { greetUser } = require("../services/different/greetUser");
var { addNewUser } = require("../database/services/addNewUser");

module.exports.chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    await ctx.reply(greetUser(ctx.chat.id, ctx.from.first_name));

    var chatMember = await ctx.chatMembers.getChatMember(
      ctx.chat.id,
      ctx.from.id
    );

    var userId = chatMember.user.id + "";
    var firstName = chatMember.user.first_name || "";
    var userName = chatMember.user.user_name || "";

    await addNewUser(userId, firstName, userName, []);
    await sendUserDataToServer({ userId, firstName, userName, orders: [] });
  });
};
