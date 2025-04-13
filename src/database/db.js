var { env } = require("../env");

var MongoClient = require("mongodb").MongoClient;

var createUser = require("./services/createUser");
var deleteUser = require("./services/deleteUser");
var deleteOrder = require("./services/deleteOrder");
var createOrder = require("./services/createOrder");
var checkOrderExists = require("./services/checkOrderExists");
var updateOrderStatus = require("./services/updateOrderStatus");
var getActiveOrdersFromDB = require("./services/getActiveOrdersFromDB");
var getCompletedOrdersFromDB = require("./services/getCompletedOrdersFromDB");

var mongodb = new MongoClient(env.mongo_url);

var startDB = async (mongodb) => await mongodb.connect();

async function dbServices() {
  await startDB(mongodb);

  var collection = mongodb.db("database").collection("users");

  return {
    deleteUser: deleteUser.bind(collection),
    createUser: createUser.bind(collection),
    deleteOrder: deleteOrder.bind(collection),
    createOrder: createOrder.bind(collection),
    checkOrderExists: checkOrderExists.bind(collection),
    updateOrderStatus: updateOrderStatus.bind(collection),
    getActiveOrdersFromDB: getActiveOrdersFromDB.bind(collection),
    getCompletedOrdersFromDB: getCompletedOrdersFromDB.bind(collection),
  };
}

module.exports = { dbServices };
