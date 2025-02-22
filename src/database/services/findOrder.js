var { db } = require("../db");

module.exports.findOrder = async (userId) => {
  try {
    var collection = (await db).collection("users");
    var orders = await collection.findOne({ userId: `${userId}` });

    return {
      active: async () =>
        orders?.orders.filter(
          (data) => data.order.orderStatus !== "order-is-completed:6"
        ),
      completed: async () =>
        orders?.orders.filter(
          (data) => data.order.orderStatus == "order-is-completed:6"
        ),
    };
  } catch (err) {
    console.log(err);
  }
};
