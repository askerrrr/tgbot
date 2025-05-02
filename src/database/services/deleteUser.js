var { DatabaseError } = require("../../bot/customError/index");

async function deleteUser(collection, userId) {
  try {
    var result = await collection.deleteOne({ userId });

    return result.deletedCount;
  } catch (e) {
    throw new DatabaseError(userId, "deleteUser", e.message);
  }
}

module.exports = deleteUser;
