var { linkForAppPoizon } = require("../../utils/text");

var linkPoizon = async (bot) => {
  bot.hears("Poizon", async (ctx) => {
    await ctx.reply(linkForAppPoizon, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};

module.exports = { linkPoizon };
