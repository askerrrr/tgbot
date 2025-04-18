async function createUser(collection, { userId, passwd, firstName, userName }) {
  var user = await collection.findOne({ userId });

  if (!user) {
    await collection.insertOne({
      userId,
      passwd,
      firstName,
      userName,
      orders: [],
    });
  }

  return;
}

module.exports = createUser;
