var { getActiveOrders } = require("./activeOrders");
var { getCompletedOrders } = require("./completedOrders");

var personalAccount = async (bot) => {
  getActiveOrders(bot);
  getCompletedOrders(bot);
};

module.exports = { personalAccount };
