async function deleteOrder(userId, orderId) {
  var result = await this.updateOne(
    {
      userId,
      "orders.id": orderId,
    },
    {
      $pull: {
        orders: { id: orderId },
      },
    }
  );

  return result.modifiedCount;
}

module.exports = deleteOrder;
