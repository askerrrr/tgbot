async function createUser({ userId, firstName, userName }) {
  var user = await this.findOne({ userId });

  if (!user) {
    await collection.insertOne({ userId, firstName, userName, orders: [] });
  }

  return;
}

module.exports = createUser;
