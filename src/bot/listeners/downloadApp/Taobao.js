var { linkForAppTaobao } = require("../../utils/text");

var linkTaobao = async (bot) =>
  bot.hears("Taobao", async (ctx) => await ctx.replyWithHTML(linkForAppTaobao));

module.exports = { linkTaobao };
