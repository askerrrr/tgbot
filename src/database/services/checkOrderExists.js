const { DatabaseError } = require("../../bot/customError");

async function checkOrderExists(collection, userId, orderId) {
  try {
    var { orders } = await collection.findOne({ userId });

    var result = orders.some((order) => order.id == orderId);

    return result;
  } catch (e) {
    e.origin = checkOrderExists.name;

    throw new DatabaseError(e, userId, orderId);
  }
}

module.exports = checkOrderExists;
