var { db } = require("../db");

var deleteOrder = async (userId, orderId) => {
  var collection = (await db).collection("users");
  var result = await collection.updateOne(
    {
      userId,
      "orders.order.id": orderId,
    },
    {
      $pull: {
        orders: { "order.id": orderId },
      },
    }
  );

  return result.modifiedCount;
};

module.exports = { deleteOrder };
