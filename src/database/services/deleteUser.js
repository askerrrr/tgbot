async function deleteUser(collection, userId) {
  var result = await collection.deleteOne({ userId });

  return result.deletedCount;
}

module.exports = deleteUser;
