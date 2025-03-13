var { backToMainMenu } = require("./backToMainMenu");
var { backToOtherMenu } = require("./backToOtherMenu");

var diffListeners = async (bot) => {
  backToMainMenu(bot);
  backToOtherMenu(bot);
};

module.exports = { diffListeners };
