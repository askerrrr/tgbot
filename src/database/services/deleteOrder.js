var { db } = require("../db");

var deleteOrder = async (userId, orderId) => {
  var collection = (await db).collection("users");

  var result = await collection.updateOne(
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
};

module.exports = { deleteOrder };
