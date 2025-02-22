var { FAQ } = require("./FAQ");
var { other } = require("./Other");
var { order } = require("./order");
var { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

module.exports.mainMenu = async (bot) => {
  FAQ(bot);
  other(bot);
  order(bot);
  howToPlaceAnOrder(bot);
};

