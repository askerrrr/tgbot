var env = require("../../../../env");
var { NetworkError } = require("../../../customError/index");

var getСurrencyValue = async (userId) => {
  try {
    var res = await fetch(env.currency_value);

    if (!res.ok) {
      throw new NetworkError(userId, res.status, "getСurrencyValue ");
    }

    var json = await res.json();

    return json.Valute.CNY.Value;
  } catch (e) {
    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userId, null, "getСurrencyValue", e);
  }
};

module.exports = getСurrencyValue;
