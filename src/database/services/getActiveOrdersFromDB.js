async function getActiveOrdersFromDB(userId) {
  var { orders } = await this.findOne({ userId });

  var activeOrders = orders.filter(
    (order) => order.orderStatus.value !== "order-is-completed"
  );

  return activeOrders;
}

module.exports = getActiveOrdersFromDB;
