async function updateOrderStatus(collection, userId, orderId, newStatus) {
  var result = await collection.updateOne(
    { userId, "orders.id": orderId },
    {
      $set: { "orders.$.orderStatus": newStatus },
    }
  );

  return result.modifiedCount;
}

module.exports = updateOrderStatus;
