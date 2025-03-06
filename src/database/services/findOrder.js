var { db } = require("../db");

module.exports.findOrder = async (userId) => {
  try {
    var collection = (await db).collection("users");
    var result = await collection.findOne({ userId });

    return {
      active: async () =>
        result?.orders.filter(
          (e) => e.order.orderStatus !== "order-is-completed:6"
        ),
      completed: async () =>
        result?.orders.filter(
          (e) => e.order.orderStatus == "order-is-completed:6"
        ),
    };
  } catch (err) {
    console.log(err);
  }
};
