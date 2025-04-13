async function deleteOrder(collection, userId, orderId) {
  var result = await collection.updateOne(
    { userId, "orders.id": orderId },
    {
      $pull: { orders: { id: orderId } },
    }
  );

  return result.modifiedCount;
}

module.exports = deleteOrder;
