var { unexpectedMessages } = require("../utils/text");

var catchUnexpectedMessages = async (ctx) =>
  await ctx.replyWithHTML(unexpectedMessages);

module.exports = { catchUnexpectedMessages };
