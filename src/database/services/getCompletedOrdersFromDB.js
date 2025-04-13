async function getCompletedOrdersFromDB(userId) {
  var { orders } = await this.findOne({ userId });

  var completedOrders = orders.filter(
    (order) => order.orderStatus.value == "order-is-completed"
  );

  return completedOrders;
}

module.exports = getCompletedOrdersFromDB ;
