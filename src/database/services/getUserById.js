var { DatabaseError } = require("../../bot/customError/index");

var getUserById = async (collection, userId) => {
  try {
    return await collection.findOne({ userId });
  } catch (e) {
    e.origin = getUserById.name;

    throw new DatabaseError(userId, e);
  }
};
module.exports = getUserById;
