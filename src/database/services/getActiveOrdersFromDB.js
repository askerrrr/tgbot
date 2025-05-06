var { DatabaseError } = require("../../bot/customError/index");

async function getActiveOrdersFromDB(collection, userId) {
  try {
    var { orders } = await collection.findOne({ userId });

    var activeOrders = orders.filter(
      (order) => order.orderStatus.value !== "order-is-completed"
    );

    return activeOrders;
  } catch (e) {
    e.origin = getActiveOrdersFromDB.name;

    throw new DatabaseError(e, userId);
  }
}

module.exports = getActiveOrdersFromDB;
