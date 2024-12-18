const { statusTranslate } = require("../../services/different/statusTranslate");

function showOrderContent(order, userId) {
  return `ID пользователя : ${userId}\nID заказа : ${
    order.file.id
  }\nНомер телефона : ${order.phone}\nВремя заказа ${
    order.date
  }\nСтатус заказа : ${statusTranslate(
    order.file.status
  )}\n\nПосмотреть содержимое заказа можно по ссылке`;
}

module.exports = { showOrderContent };
