var { linkForAppPoizon } = require("../../utils/text");

var linkPoizon = async (bot) =>
  bot.hears("Poizon", async (ctx) => await ctx.replyWithHTML(linkForAppPoizon));

module.exports = { linkPoizon };
