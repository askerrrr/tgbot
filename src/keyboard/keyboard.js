var { Keyboard } = require("grammy");

var MainMenu = new Keyboard()
  .text("Сделать заказ!")
  .text("Как сделать заказ?")
  .row()
  .text("Рассчитать стоимость заказа")
  .text("Другое")
  .row()
  .text("Часто задаваемые вопросы FAQ")
  .resized();

var OtherQueries = new Keyboard()

  .text("Личный кабинет")
  .row()
  .text("Получить шаблон")
  .row()
  .text("Скачать приложения")
  .row()
  .text("Основное меню")
  .resized();

var PersonalAccount = new Keyboard()
  .text("Активные заказы")
  .row()
  .text("Завершенные заказы")
  .row()
  .text("Назад")
  .resized();

var DownloadingApp = new Keyboard()
  .text("1688")
  .text("Taobao")
  .row()
  .text("Poizon")
  .text("Pinduoduo")
  .row()
  .text("Назад")
  .resized();

var AppGuides = new Keyboard()
  .text("Гайд по 1688")
  .text("Гайд по Taobao")
  .row()
  .text("Гайд по Ponzon")
  .text("Гайд по Pinduoduo")
  .row()
  .text("Основное меню")
  .resized();

var СheckingOrder = new Keyboard()
  .text("Да, все правильно!")
  .row()
  .text("Нет, тут ошибка, я хочу исправить данные")
  .resized();

var Order = new Keyboard()
  .text("Заказать один товар")
  .row()
  .text("Заказать несколько товаров")
  .resized();

var FAQ = new Keyboard()
  .text("Доставка")
  .row()
  .text("Маркеплейсы с которыми работаем")
  .row()
  .text("Основное меню")
  .resized();

var Delivery = new Keyboard()
  .text("Адрес доставки")
  .text("Стоимость доставки")
  .row()
  .text("Сроки доставки")
  .row()
  .text("Назад к вопросам")
  .resized();

var keyboard = {
  FAQ,
  Order,
  Delivery,
  AppGuides,
  MainMenu,
  OtherQueries,
  СheckingOrder,
  DownloadingApp,
  PersonalAccount,
};

module.exports = { keyboard };
