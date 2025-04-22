var env = require("../../../env");
var getStatusDescription = require("../../services/different/getStatusDescription");

var showOrder = ({ id, userId, phone, date, orderStatus }) => {
  orderStatus = getStatusDescription(orderStatus);

  var orderLink = `<u><a href="${env.user_order_path}${userId}/${id}" target="_blank">Открыть заказ</a></u>`;

  return `ID пользователя: ${userId}\nID заказа: ${id}\nНомер телефона: ${phone}\nВремя заказа ${date}\nСтатус заказа: ${orderStatus}\n\n${orderLink}`;
};

module.exports = { showOrder };
