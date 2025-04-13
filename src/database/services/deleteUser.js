async function deleteUser(userId) {
  var result = await collection.this({ userId });

  return result.deletedCount;
}

module.exports = deleteUser;
