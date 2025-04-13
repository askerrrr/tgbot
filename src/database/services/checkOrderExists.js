async function checkOrderExists(collection, userId, orderId) {
  var { orders } = await collection.findOne({ userId });

  var result = orders.some((order) => order.id == orderId);

  return result;
}

module.exports = checkOrderExists;
