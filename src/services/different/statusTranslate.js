module.exports.statusTranslate = (statusId) => {
  var translatedStatus;
  switch (statusId.split(":")[1]) {
    case "0":
      translatedStatus = "Не взят в обработку";
      break;
    case "1":
      translatedStatus = "Взят в обработку";
      break;
    case `2`:
      translatedStatus = `Товар выкуплен`;
      break;
    case "3":
      translatedStatus = "Товар поступил на склад в китае";
      break;
    case `4`:
      translatedStatus = `В пути`;
      break;
    case `5`:
      translatedStatus = `Ожидает получения по адресу\nСолдатский переулок  8,  подъезд 2,  этаж 8,  кв 98`;
      break;
    case "6":
      translatedStatus = "Заказ завершен";
      break;
  }

  return translatedStatus;
};
