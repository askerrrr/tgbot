var { getActiveOrders } = require("./activeOrders");
var { getCompletedOrders } = require("./completedOrders");

module.exports.personalAccount = async (bot) => {
  getActiveOrders(bot);
  getCompletedOrders(bot);
};
