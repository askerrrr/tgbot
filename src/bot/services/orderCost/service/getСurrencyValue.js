var env = require("../../../../env");

var getСurrencyValue = async () => {
  var response = await fetch(env.currency_value);

  if (!response.ok) {
    throw new Error("Cannot get currency value");
  }

  var json = await response.json();

  return json.Valute.CNY.Value;
};

module.exports = getСurrencyValue;
