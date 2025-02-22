var { convertYuanToRubles } = require("./service/convertYuanToRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");

  var result = await conversation.wait();

  var num = +result.msg.text;

  if (num > 0 && num < 1e6) {
    var result = await convertYuanToRubles(num);
    await ctx.reply(
      `Ориентировочная стоимость товара ${result}р \n*без учета стоимости доставки\n\nПодробнее о тарифах доставки можно узнать в разделе "Часто задаваемые вопросы"`
    );
  } else if (num > 1e6) {
    await ctx.reply(
      `Боюсь, что у вас нет таких денег)))\nВведите числовое значение, которое больше 0`
    );

    return await calcOrderCost(conversation, ctx);
  } else {
    await ctx.reply(`Введите числовое значение, которое больше 0`);
    return await calcOrderCost(conversation, ctx);
  }
}

module.exports = { calcOrderCost };
