var { getTemplate } = require("./getTemplate");
var { downloadApp } = require("./downloadApp");
var { personalAccount } = require("./personalAccount");

var other = async (bot) => {
  getTemplate(bot);

  downloadApp(bot);

  personalAccount(bot);
};

module.exports = { other };
