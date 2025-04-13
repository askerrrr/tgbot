async function createUser(collection, { userId, firstName, userName }) {
  var user = await collection.findOne({ userId });

  if (!user) {
    await collection.insertOne({ userId, firstName, userName, orders: [] });
  }

  return;
}

module.exports = createUser;
