var { env } = require("../../../env");

module.exports.sendOrderToServer = async (order, ctx) => {
  try {
    var response = await fetch(env.bot_api_order, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.bot_secret_key,
      },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log("Ошибка при отправлении заказа", err);
      await ctx.reply(
        "Произошла ошибка при формировании заказа, попробуйте еще раз"
      );
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
