var { db } = require("../db");

var createItemStatusCollection = async (order) => {
  var collection = (await db).collection("items");

  await collection.insertOne({ userId: order.userId, orders: [] });
};

module.exports = { createItemStatusCollection };
