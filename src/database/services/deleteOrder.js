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
    throw new DatabaseError(userId, "deleteOrder", e.message);
  }
}

module.exports = deleteOrder;
