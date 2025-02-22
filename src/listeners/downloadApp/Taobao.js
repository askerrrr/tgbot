var { linkForAppTaobao } = require("../../utils/text");

module.exports.linkTaobao = async (bot) => {
  bot.hears("Taobao", async (ctx) => {
    await ctx.reply(linkForAppTaobao, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};
