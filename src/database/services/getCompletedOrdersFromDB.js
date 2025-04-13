var { db } = require("../db");

var getCompletedOrdersFromDB = async (userId) => {
  var collection = (await db).collection("users");

  var { orders } = await collection.findOne({ userId });

  var completedOrders = orders.filter(
    (order) => order.orderStatus.value == "order-is-completed"
  );

  return completedOrders;
};

module.exports = { getCompletedOrdersFromDB };
