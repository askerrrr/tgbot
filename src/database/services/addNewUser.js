var { db } = require("../db");

module.exports.addNewUser = async (userId, firstName, userName, orders) => {
  var collection = (await db).collection("users");
  var existingDocument = await collection.findOne({ userId });

  if (!existingDocument) {
    await collection.insertOne({ userId, firstName, userName, orders });
  }

  return;
};
