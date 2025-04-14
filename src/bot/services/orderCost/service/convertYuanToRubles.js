var env = require("../../../../env");
var shorteningString = require("./shorteningString");
var getСurrencyValue = require("./getСurrencyValue");

var convertYuanToRubles = async (userValue) => {
  var valuteValue = await getСurrencyValue();

  var result =
    (valuteValue + env.yuanCommission) *
      userValue *
      (1 + env.sellerCommission) +
    "";

  return shorteningString(result);
};

module.exports = convertYuanToRubles;
