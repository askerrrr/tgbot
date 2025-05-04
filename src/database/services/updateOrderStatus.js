var { DatabaseError } = require("../../bot/customError/index");

async function updateOrderStatus(collection, userId, orderId, newStatus) {
  try {
    var result = await collection.updateOne(
      { userId, "orders.id": orderId },
      {
        $set: { "orders.$.orderStatus": newStatus },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    e.origin = updateOrderStatus.name;

    throw new DatabaseError(userId, e);
  }
}

module.exports = updateOrderStatus;
