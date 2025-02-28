var { env } = require("../../../env");

module.exports.guideForPinduoduo = async (bot) => {
  var guideURL = `Посмотреть гайд на youtube ${env.guideURLPinduoduo}`;

  bot.hears("Гайд по Pinduoduo", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};
