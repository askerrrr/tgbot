var getСurrencyValue = async () => {
  var response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

  if (!response.ok) {
    throw new Error("Cannot get currency value");
  }

  var json = await res.json();

  return json.Valute.CNY.Value;
};

module.exports = { getСurrencyValue };
