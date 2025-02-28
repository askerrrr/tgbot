var { linkForApp1688 } = require('../../utils/text');

module.exports.link1688 = async (bot) => {
  bot.hears("1688", async (ctx) => {
    await ctx.reply(linkForApp1688, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};
