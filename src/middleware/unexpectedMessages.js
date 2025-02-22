var { unexpectedMessages } = require("../utils/text");

module.exports.catchUnexpectedMessages = async (ctx) => {
  await ctx.reply(unexpectedMessages, {
    parse_mode: "HTML",
  });
};
