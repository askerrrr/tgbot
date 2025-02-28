var { env } = require("../../../../env");

module.exports.makeOrderNotification = (order) => {
  if (order.type) {
    return `Новый заказ\n
    ID пользователя: ${order.userId}\nНомер телефона: ${order.phone}\n
    Ссылка на товар: ${env.main_server}/download/${order.userId}/${order.id}\n
    Описание:\nКоличество: ${order.description.qty}\nРазмер: ${order.description.size}\n
    ID заказа: ${order.id}\nВремя заказа: ${order.date}`;
  }

  return `Новый заказ\n
  ID пользователя: ${order.userId}\nНомер телефона: ${order.phone}\n
  Ссылка на файл: ${env.main_server}/download/${order.userId}/${order.id}\n
  ID заказа: ${order.id}\nВремя заказа: ${order.date}`;
};
