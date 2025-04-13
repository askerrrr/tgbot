var { db } = require("../db");

var checkOrderExists = async (userId, orderId) => {
  var collection = (await db).collection("users");

  var { orders } = await collection.findOne({ userId });

  var result = orders.some((order) => order.id == orderId);

  return result;
};

module.exports = { checkOrderExists };
