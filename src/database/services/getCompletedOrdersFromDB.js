async function getCompletedOrdersFromDB(collection, userId) {
  var { orders } = await collection.findOne({ userId });

  var completedOrders = orders.filter(
    (order) => order.orderStatus.value == "order-is-completed"
  );

  return completedOrders;
}

module.exports = getCompletedOrdersFromDB;
