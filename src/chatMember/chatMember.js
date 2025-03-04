const { addNewUser } = require("../database/services/addNewUser");
const { greetUser } = require("../services/different/greetUser");

module.exports.chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    await ctx.reply(greetUser(ctx.chat.id, ctx.from.first_name));

    var chatMember = await ctx.chatMembers.getChatMember(
      ctx.chat.id,
      ctx.from.id
    );

    var newUser = {
      userId: chatMember.user.id + "",
      firstName: chatMember.user.first_name || "",
      userName: chatMember.user.user_name || "",
      orders: [],
    };

    await addNewUser(newUser);
  });
};
