var { db } = require("../db");

var findOrder = async (userId) => {
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
};

module.exports = { findOrder };
