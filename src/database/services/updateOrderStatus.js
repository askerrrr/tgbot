var { db } = require("../db");
var { reportError } = require("../../errReportBot");

module.exports.updateOrderStatus = async (order) => {
  try {
    var collection = (await db).collection("users");
    var updatedStatus = await collection.updateOne(
      { userId: order.userId, "orders.order.id": order.id },
      {
        $set: { "orders.$.order.orderStatus": order.orderStatus },
      }
    );

    if (!updatedStatus) {
      await reportError(order.userId, "Ошибка при обновлении статуса в БД");

      return;
    }

    return updatedStatus;
  } catch (err) {
    console.log(err);
  }
};
