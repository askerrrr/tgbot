var { DatabaseError } = require("../../bot/customError/index");

var getUserById = async (collection, userId) => {
  try {
    return await collection.findOne({ userId });
  } catch (e) {
    e.origin = getUserById.name;

    throw new DatabaseError(e, userId);
  }
};
module.exports = getUserById;
