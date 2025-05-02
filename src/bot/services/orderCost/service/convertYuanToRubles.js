var env = require("../../../../env");
var shorteningString = require("./shorteningString");
var getСurrencyValue = require("./getСurrencyValue");

var convertYuanToRubles = async (userValue, userId) => {
  var valuteValue = await getСurrencyValue(userId);

  var result =
    (valuteValue + env.yuanCommission) *
      userValue *
      (1 + env.sellerCommission) +
    "";

  return shorteningString(result);
};

module.exports = convertYuanToRubles;
