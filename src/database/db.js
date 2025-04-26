var env = require("../env");

var { MongoClient } = require("mongodb");

var getUserById = require("./services/getUserById");
var createUser = require("./services/createUser");
var deleteUser = require("./services/deleteUser");
var deleteOrder = require("./services/deleteOrder");
var createOrder = require("./services/createOrder");
var checkOrderExists = require("./services/checkOrderExists");
var updateOrderStatus = require("./services/updateOrderStatus");
var getActiveOrdersFromDB = require("./services/getActiveOrdersFromDB");
var getCompletedOrdersFromDB = require("./services/getCompletedOrdersFromDB");

var mongodb = new MongoClient(env.mongo_url);

(async () =>
  await mongodb.connect().then(() => console.log("mongodb is connected")))();

async function dbServices() {
  var collection = mongodb.db("database").collection("users");

  return {
    getUserById: (userId) => getUserById(collection, userId),

    deleteUser: (userId) => deleteUser(collection, userId),

    createUser: (userData) => createUser(collection, userData),

    deleteOrder: (userId, orderId) => deleteOrder(collection, userId, orderId),

    createOrder: (orderData) => createOrder(collection, orderData),

    checkOrderExists: (userId, orderId) =>
      checkOrderExists(collection, userId, orderId),

    updateOrderStatus: (userId, orderId, newStatus) =>
      updateOrderStatus(collection, userId, orderId, newStatus),

    getActiveOrdersFromDB: (userId) =>
      getActiveOrdersFromDB(collection, userId),

    getCompletedOrdersFromDB: (userId) =>
      getCompletedOrdersFromDB(collection, userId),
  };
}

module.exports = { dbServices };
