var { db } = require("../db");

var updateOrderStatus = async (userId, orderId, newStatus) => {
  var collection = (await db).collection("users");

  var result = await collection.updateOne(
    { userId, "orders.id": orderId },
    {
      $set: { "orders.$.orderStatus": newStatus },
    }
  );

  return result.modifiedCount;
};

module.exports = { updateOrderStatus };
