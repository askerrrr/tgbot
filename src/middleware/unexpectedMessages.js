var { unexpectedMessages } = require("../utils/text");

var catchUnexpectedMessages = async (ctx) => {
  await ctx.reply(unexpectedMessages, {
    parse_mode: "HTML",
  });
};

module.exports = { catchUnexpectedMessages };
