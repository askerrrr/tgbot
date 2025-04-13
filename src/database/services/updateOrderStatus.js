async function updateOrderStatus(userId, orderId, newStatus) {
  var result = await this.updateOne(
    { userId, "orders.id": orderId },
    {
      $set: { "orders.$.orderStatus": newStatus },
    }
  );

  return result.modifiedCount;
}

module.exports = updateOrderStatus;
