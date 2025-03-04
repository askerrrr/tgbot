var { db } = require("../db");

var createItemCollection = async (order) => {
  var collection = (await db).collection("items");

  await collection.insertOne({ userId: order.userId, orders: [] });
};

module.exports = { createItemCollection };
