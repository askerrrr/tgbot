var { env } = require("../../../env");
var { shorteningString } = require("./shorteningString");
var { getCNYValuteValue } = require("./getCNYValuteValue");

module.exports.convertYuanToRubles = async (val) => {
  var valuteValue = await getCNYValuteValue();

  var result =
    (valuteValue + env.yuanCommission) * val * (1 + env.sellerCommission) + "";

  var num = shorteningString(result);

  return num;
};
