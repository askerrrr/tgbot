module.exports.getCNYValuteValue = async () => {
  var res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

  var json = await res.json();

  return json.Valute.CNY.Value;
};
