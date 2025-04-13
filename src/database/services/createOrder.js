var createUser = require("./createUser");
var checkOrderExists = require("./checkOrderExists");

async function createOrder(collection, orderData) {
  delete orderData.file;

  var { userId, id } = orderData;

  var user = await collection.findOne({ userId });

  if (!user) {
    await createUser(collection, orderData);
  }

  if (await checkOrderExists(collection, userId, id)) {
    return;
  }

  var result = await collection.updateOne(
    { userId },
    { $push: { orders: { ...orderData } } }
  );

  return result.modifiedCount;
}

module.exports = createOrder;
