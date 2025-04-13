var { db } = require("../db");

var getActiveOrdersFromDB = async (userId) => {
  var collection = (await db).collection("users");

  var { orders } = await collection.findOne({ userId });

  var activeOrders = orders.filter(
    (order) => order.orderStatus.value !== "order-is-completed"
  );

  return activeOrders;
};

module.exports = { getActiveOrdersFromDB };
