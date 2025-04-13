var { db } = require("../db");
var { createUser } = require("./createUser");
var { checkOrderExists } = require("./checkOrderExists");

var createOrder = async (orderData) => {
  delete orderData.file;

  var collection = (await db).collection("users");

  var { userId, id } = orderData;

  var user = await collection.findOne({ userId });

  if (!user) {
    await createUser(orderData);
  }

  var orderIsExist = await checkOrderExists(userId, id);

  if (orderIsExist) {
    return;
  }

  var result = await collection.updateOne(
    { userId },
    { $push: { orders: { ...orderData } } }
  );

  return result.modifiedCount;
};

module.exports = { createOrder };
