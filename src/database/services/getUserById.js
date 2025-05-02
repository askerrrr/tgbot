var { DatabaseError } = require("../../bot/customError/index");

var getUserById = async (collection, userId) => {
  try {
    return await collection.findOne({ userId });
  } catch (e) {
    throw new DatabaseError(userId, "getUserById", e.message);
  }
};
module.exports = getUserById;
