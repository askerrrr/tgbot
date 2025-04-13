async function getActiveOrdersFromDB(collection, userId) {
  var { orders } = await collection.findOne({ userId });

  var activeOrders = orders.filter(
    (order) => order.orderStatus.value !== "order-is-completed"
  );

  return activeOrders;
}

module.exports = getActiveOrdersFromDB;
