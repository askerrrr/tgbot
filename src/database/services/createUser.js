async function createUser(collection, { userId, passwd, firstName, userName }) {
  var user = await collection.findOne({ userId });

  if (!user) {
    var result = await collection.insertOne({
      userId,
      passwd,
      firstName,
      userName,
      orders: [],
    });

    return result.acknowledged;
  }

  return true;
}

module.exports = createUser;
