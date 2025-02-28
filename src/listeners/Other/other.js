var { getTemplate } = require("./getTemplate");
var { downloadApp } = require("./downloadApp");
var { personalAccount } = require("./personalAccount");

module.exports.other = async (bot) => {
  getTemplate(bot);

  downloadApp(bot);

  personalAccount(bot);
};
