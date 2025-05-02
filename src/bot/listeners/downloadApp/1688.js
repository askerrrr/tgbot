var { linkForApp1688 } = require("../../utils/text");

var link1688 = async (bot) =>
  bot.hears("1688", async (ctx) => await ctx.replyWithHTML(linkForApp1688));

module.exports = { link1688 };
