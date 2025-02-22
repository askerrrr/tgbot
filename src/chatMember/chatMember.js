var {
  sendUserDataToServer,
} = require("../services/different/sendUserDataToServer");

module.exports.chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    try {
      await ctx.reply(
        `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}\nДля дальнейшей работы воспользуйтесь 'Меню'\n\n*при работе с ботом рекомендуется отключать VPN`
      );

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

      await sendUserDataToServer(newUser);
    } catch (err) {
      console.log(err.message);
    }
  });
};
