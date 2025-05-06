var { DatabaseError } = require("../../bot/customError/index");

async function getCompletedOrdersFromDB(collection, userId) {
  try {
    var { orders } = await collection.findOne({ userId });

    var completedOrders = orders.filter(
      (order) => order.orderStatus.value == "order-is-completed"
    );

    return completedOrders;
  } catch (e) {
    e.origin = getCompletedOrdersFromDB.name;

    throw new DatabaseError(e, userId);
  }
}

module.exports = getCompletedOrdersFromDB;
