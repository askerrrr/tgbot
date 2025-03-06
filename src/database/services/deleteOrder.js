var { db } = require("../db");

module.exports.deleteOrder = async (userId, orderId) => {
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

  return result.modifiedCount == 0 ? false : result;
};
