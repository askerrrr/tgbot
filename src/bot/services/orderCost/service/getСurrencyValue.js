var env = require("../../../../env");
var { NetworkError } = require("../../../customError/index");

var getСurrencyValue = async (userId) => {
  try {
    var res = await fetch(env.currency_value);

    if (!res.ok) {
      throw new NetworkError(userId, res.statusText, res.status);
    }

    var json = await res.json();

    return json.Valute.CNY.Value;
  } catch (e) {
    e.origin = getСurrencyValue.name;

    if (e instanceof NetworkError) {
      throw e;
    }

    throw new NetworkError(userId, e.message);
  }
};

module.exports = getСurrencyValue;
