var { db } = require("../db");

module.exports.addOrders = async (order) => {
  var collection = (await db).collection("users");

  await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );
};
