var { delivery } = require("./delivery/delivery");
var { shoppingSites } = require("./shoppingSites");

var FAQ = async (bot) => {
  delivery(bot);
  shoppingSites(bot);
};

module.exports = { FAQ };
