var { shoppingSites } = require("./shoppingSites");
var { delivery } = require("./delivery/delivery");

module.exports.FAQ = async (bot) => {
  delivery(bot);
  shoppingSites(bot);
};
