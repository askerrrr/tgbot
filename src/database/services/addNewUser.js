var { db } = require("../db");

module.exports.addNewUser = async (user) => {
  try {
    var collection = (await db).collection("users");
    var document = await collection.findOne({ userId: user.userId });

    if (!document) return await collection.insertOne(user);

    return;
  } catch (err) {
    console.log(err);
  }
};
