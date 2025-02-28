var { env } = require("../../../../env");
var { getCNYValuteValue } = require("./getCNYValuteValue");

module.exports.convertYuanToRubles = async (val) => {
  var valuteValue = await getCNYValuteValue();

  var result =
    (valuteValue + env.yuanCommission) * val * (1 + env.sellerCommission) + "";

  var [a, b] = result.split(".");

  return a + "." + b.slice(0, 2);
};
