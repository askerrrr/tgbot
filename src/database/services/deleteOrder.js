var { db } = require("../db");

module.exports.deleteOrder = async (userId, orderId) => {
  try {
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

    if (result.modifiedCount === 0) return null;

    return result;
  } catch (err) {
    console.log(err);
  }
};
