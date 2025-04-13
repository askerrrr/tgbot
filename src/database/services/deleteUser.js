async function deleteUser(collection, userId) {
  var result = await collection.findOne({ userId });

  return result.deletedCount;
}

module.exports = deleteUser;
