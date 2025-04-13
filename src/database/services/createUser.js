var { db } = require("../db");

var createUser = async ({ userId, firstName, userName }) => {
  var collection = (await db).collection("users");

  var user = await collection.findOne({ userId });

  if (!user) {
    await collection.insertOne({ userId, firstName, userName, orders: [] });
  }

  return;
};

module.exports = { createUser };
