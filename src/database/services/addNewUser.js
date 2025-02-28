var { db } = require("../db");

module.exports.addNewUser = async (user) => {
  try {
    var collection = (await db).collection("users");
    var existingDocument = await collection.findOne({ userId: user.userId });

    if (!existingDocument) return await collection.insertOne(user);

    return null;
  } catch (err) {
    console.log(err);
  }
};
