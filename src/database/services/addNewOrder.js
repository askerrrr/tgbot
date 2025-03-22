var { db } = require("../db");
var { addNewUser } = require("./addNewUser");

var addNewOrder = async (order) => {
  delete order.file;

  var collection = (await db).collection("users");
  var document = await collection.findOne({
    userId: order.userId,
  });

  var result;

  if (!document) {
    await addNewUser(order.userId, order.firstName, order.userName);

    result = await collection.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } }
    );

    return result.modifiedCount;
  }

  result = await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );

  return result.modifiedCount;
};

module.exports = { addNewOrder };
