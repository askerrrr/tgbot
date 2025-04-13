async function checkOrderExists(userId, orderId) {
  var { orders } = await this.findOne({ userId });

  var result = orders.some((order) => order.id == orderId);

  return result;
}

module.exports = checkOrderExists;
