var getUserById = async (collection, userId) =>
  await collection.findOne({ userId });

module.exports = getUserById;
