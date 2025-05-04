var { DatabaseError } = require("../../bot/customError/index");

async function deleteUser(collection, userId) {
  try {
    var result = await collection.deleteOne({ userId });

    return result.deletedCount;
  } catch (e) {
    e.origin = deleteUser.name;

    throw new DatabaseError(userId, e);
  }
}

module.exports = deleteUser;
