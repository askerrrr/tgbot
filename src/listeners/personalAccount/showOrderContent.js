var { statusTranslate } = require("../../services/different/statusTranslate");

module.exports.showOrder = (order) => {
  return `ID пользователя : ${order.userId}\nID заказа : ${
    order.id
  }\nНомер телефона : ${order.phone}\nВремя заказа ${
    order.date
  }\nСтатус заказа : ${statusTranslate(
    order.orderStatus
  )}\n\nПосмотреть содержимое заказа можно по ссылке\n`;
};
