var { backToMainMenu } = require("./backToMainMenu");
var { backToOtherMenu } = require("./backToOtherMenu");

module.exports.diffListeners = async (bot) => {
  backToMainMenu(bot);
  backToOtherMenu(bot);
};
