var { db } = require("../db");

var addNewUser = async (userId, firstName, userName) => {
  var collection = (await db).collection("users");
  var existingDocument = await collection.findOne({ userId });

  if (!existingDocument) {
    await collection.insertOne({ userId, firstName, userName, orders: [] });
  }

  return;
};

module.exports = { addNewUser };
