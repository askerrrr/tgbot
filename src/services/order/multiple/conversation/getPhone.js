module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Напишите номер вашего телефона без пробелов, скобок и дефисов"
    );

    var message = await conversation.wait();
    var phone = message.msg.text;

    if (phone.length == 11 && +phone) {
      return phone;
    } else {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return;
    }
  } catch (err) {
    console.log(err);
  }
};
