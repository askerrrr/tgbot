var { db } = require("../db");

var deleteUser = async (userId) => {
  var collection = (await db).collection("users");

  var result = await collection.deleteOne({ userId });

  return result.deletedCount;
};

module.exports = { deleteUser };
