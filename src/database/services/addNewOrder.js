var { db } = require("../db");
var { addNewUser } = require("./addNewUser");

module.exports.addNewOrder = async (order) => {
  delete order.file;

  var collection = (await db).collection("users");
  var existingDocument = await collection.findOne({
    userId: order.userId,
  });

  if (!existingDocument) {
    await addNewUser(order.userId, order.firstName, order.userName, []);

    await collection.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } }
    );
  }

  await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );
};
