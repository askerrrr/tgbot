var { FAQ } = require("./FAQ/FAQ");
var { other } = require("./Other/other");
var { guides } = require("./Guides/Guides");
var { mainMenu } = require("./MainMenu/mainMenu");
var { downloadApp } = require("./downloadApp/downloadApp");
var { diffListeners } = require("./different/diffListeners");
var { personalAccount } = require("./personalAccount/personalAccount");
var { middlewareForConversations } = require("../middleware/middleware");

module.exports.allListeners = async (bot) => {
  FAQ(bot);
  other(bot);
  guides(bot);
  mainMenu(bot);
  downloadApp(bot);
  diffListeners(bot);
  personalAccount(bot);
  middlewareForConversations(bot);
};
