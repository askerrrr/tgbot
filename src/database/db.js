var { env } = require("../../env");
var MongoClient = require("mongodb").MongoClient;

var mongodb = new MongoClient(env.mongo_url);

var db = (async () => {
  await mongodb.connect();
  console.log("mongodb started");

  return mongodb.db("database");
})();

module.exports = { db };
