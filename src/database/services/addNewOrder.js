var { db } = require("../db");

module.exports.addNewOrder = async (order) => {
  try {
    var collection = (await db).collection("users");
    var existingDocument = await collection.findOne({
      userId: order.userId,
    });

    if (!existingDocument) {
      var newUser = {
        userId: order.userId,
        firstName: order.firstName,
        userName: order.userName,
        orders: [],
      };

      var result = await collection.insertOne(newUser);

      if (!result) return;

      return await collection.updateOne(
        { userId: order.userId },
        { $push: { orders: { order } } }
      );
    }

    await collection.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } }
    );
  } catch (err) {
    console.log(err);
  }
};
