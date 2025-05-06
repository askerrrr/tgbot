const { DatabaseError } = require("../../bot/customError");

async function deleteOrder(collection, userId, orderId) {
  try {
    var result = await collection.updateOne(
      { userId, "orders.id": orderId },
      {
        $pull: { orders: { id: orderId } },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    e.origin = deleteOrder.name;

    throw new DatabaseError(e, userId, orderId);
  }
}

module.exports = deleteOrder;
