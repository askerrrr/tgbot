var { db } = require("../db");

var checkOrderExists = async (userId, orderId) => {
  var collection = (await db).collection("users");

  var document = await collection.findOne(userId);

  var order = document.orders.some((e) => e.order.id == orderId);

  return order;
};

module.exports = { checkOrderExists };
