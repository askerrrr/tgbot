var { env } = require("../../../env");
var { shorteningString } = require("./shorteningString");
var { getСurrencyValue } = require("./getСurrencyValue");

var convertYuanToRubles = async (val) => {
  var valuteValue = await getСurrencyValue();

  var result =
    (valuteValue + env.yuanCommission) * val * (1 + env.sellerCommission) + "";

  return shorteningString(result);
};

module.exports = { convertYuanToRubles };
