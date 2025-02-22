var { linkForAppPinduoduo } = require('../../utils/text');

module.exports.linkPinduoduo = async (bot) => {
  bot.hears("Pinduoduo", async (ctx) => {
    await ctx.reply(linkForAppPinduoduo, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};
