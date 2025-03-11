var {
  getStatusDescription,
} = require("../../services/different/getStatusDescription");

module.exports.showOrder = (order) =>
  `ID пользователя : ${order.userId}\nID заказа : ${
    order.id
  }\nНомер телефона : ${order.phone}\nВремя заказа ${
    order.date
  }\nСтатус заказа : ${getStatusDescription(order.orderStatus)}`;
