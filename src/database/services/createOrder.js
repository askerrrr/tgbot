var createUser = require("./createUser");
var checkOrderExists = require("./checkOrderExists");

async function createOrder(orderData) {
  delete orderData.file;

  var { userId, id } = orderData;

  var user = await this.findOne({ userId });

  if (!user) {
    await createUser(orderData);
  }

  var orderIsExist = await checkOrderExists(userId, id);

  if (orderIsExist) {
    return;
  }

  var result = await this.updateOne(
    { userId },
    { $push: { orders: { ...orderData } } }
  );

  return result.modifiedCount;
}

module.exports = createOrder;
