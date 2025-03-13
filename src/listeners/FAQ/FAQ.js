var { shoppingSites } = require("./shoppingSites");
var { delivery } = require("./delivery/delivery");

var FAQ = async (bot) => {
  delivery(bot);
  shoppingSites(bot);
};

module.exports = { FAQ };
