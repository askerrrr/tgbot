var { DatabaseError } = require("../../bot/customError/index");

async function getCompletedOrdersFromDB(collection, userId) {
  try {
    var { orders } = await collection.findOne({ userId });

    var completedOrders = orders.filter(
      (order) => order.orderStatus.value == "order-is-completed"
    );

    return completedOrders;
  } catch (e) {
    throw new DatabaseError(userId, "getCompletedOrdersFromDB", e.message);
  }
}

module.exports = getCompletedOrdersFromDB;
