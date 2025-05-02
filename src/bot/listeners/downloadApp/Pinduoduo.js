var { linkForAppPinduoduo } = require("../../utils/text");

var linkPinduoduo = async (bot) =>
  bot.hears(
    "Pinduoduo",
    async (ctx) => await ctx.replyWithHTML(linkForAppPinduoduo)
  );

module.exports = { linkPinduoduo };
