var { env } = require("../../../env");
var { db } = require("../db");

module.exports.updateOrderStatus = async (ctx, order) => {
  try {
    var collection = (await db).collection("users");
    var updatedStatus = await collection.updateOne(
      { userId: order.userId, "orders.order.id": order.id },
      {
        $set: { "orders.$.order.orderStatus": order.orderStatus },
      }
    );

    if (!updatedStatus) {
      console.log("Ошибка при обновлении статуса...");
      await env.sendErrToAdmin(ctx, "Ошибка при обновлении статуса", null);
      return;
    }

    return updatedStatus;
  } catch (err) {
    console.log(err);
  }
};
