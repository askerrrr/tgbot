var { db } = require("../db");

var updateOrderStatus = async (userId, orderId, newStatus) => {
  var collection = (await db).collection("users");

  var updatedStatus = await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.orderStatus": newStatus },
    }
  );

  return updatedStatus.modifiedCount;
};


module.exports = {updateOrderStatus}