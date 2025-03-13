var { db } = require("../db");

var addOrders = async (order) => {
  var collection = (await db).collection("users");

  await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );
};

module.exports = { addOrders };
