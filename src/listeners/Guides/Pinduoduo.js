var { env } = require("../../env");

var guideForPinduoduo = async (bot) => {
  var guideURL = `Посмотреть гайд на youtube ${env.guideURLPinduoduo}`;

  bot.hears("Гайд по Pinduoduo", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};

module.exports = { guideForPinduoduo };
