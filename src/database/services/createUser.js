const { DatabaseError } = require("../../bot/customError");

async function createUser(collection, { userId, passwd, firstName, userName }) {
  try {
    var user = await collection.findOne({ userId });

    if (!user) {
      var result = await collection.insertOne({
        userId,
        passwd,
        firstName,
        userName,
        orders: [],
      });

      return result.acknowledged;
    }

    return true;
  } catch (e) {
    throw new DatabaseError(userId, "createUser", e.message);
  }
}

module.exports = createUser;
