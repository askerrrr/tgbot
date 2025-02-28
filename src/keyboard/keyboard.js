var { Keyboard } = require("grammy");

var keyboardForTheMainMenu = new Keyboard()
  .text("Сделать заказ!")
  .text("Как сделать заказ?")
  .row()
  .text("Рассчитать стоимость заказа")
  .text("Другое")
  .row()
  .text("Часто задаваемые вопросы FAQ")
  .resized();

var keyboardForOtherQueries = new Keyboard()

  .text("Личный кабинет")
  .row()
  .text("Получить шаблон")
  .row()
  .text("Скачать приложения")
  .row()
  .text("Основное меню")
  .resized();

var keyboardForPersonalAccount = new Keyboard()
  .text("Активные заказы")
  .row()
  .text("Завершенные заказы")
  .row()
  .text("Назад")
  .resized();

var keyboardForDownloadingApp = new Keyboard()
  .text("1688")
  .text("Taobao")
  .row()
  .text("Poizon")
  .text("Pinduoduo")
  .row()
  .text("Назад")
  .resized();

var keyboardForAppGuides = new Keyboard()
  .text("Гайд по 1688")
  .text("Гайд по Taobao")
  .row()
  .text("Гайд по Ponzon")
  .text("Гайд по Pinduoduo")
  .row()
  .text("Основное меню")
  .resized();

var keyboardForСheckingOrder = new Keyboard()
  .text("Да, все правильно!")
  .row()
  .text("Нет, тут ошибка, я хочу исправить данные")
  .resized();

var keyboardForOrder = new Keyboard()
  .text("Заказать один товар")
  .row()
  .text("Заказать несколько товаров")
  .resized();

var keyboardForFAQ = new Keyboard()
  .text("Доставка")
  .row()
  .text("Маркеплейсы с которыми работаем")
  .row()
  .text("Основное меню")
  .resized();

var keyboardForDelivery = new Keyboard()
  .text("Адрес доставки")
  .text("Стоимость доставки")
  .row()
  .text("Сроки доставки")
  .row()
  .text("Назад к вопросам")
  .resized();

module.exports = {
  keyboardForFAQ,
  keyboardForOrder,
  keyboardForDelivery,
  keyboardForAppGuides,
  keyboardForTheMainMenu,
  keyboardForOtherQueries,
  keyboardForСheckingOrder,
  keyboardForDownloadingApp,
  keyboardForPersonalAccount,
};
