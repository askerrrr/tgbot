module.exports.getDescriprion = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
    );

    var message = await conversation.wait();

    var [qty, ...size] = message.msg.text.split(" ");

    if (size.length < 1) size = "";
    else size = size.join(" ");

    return +qty > 0 && +qty < 1e4 && size.length < 40 ? { qty, size } : null;
  } catch (err) {
    console.log(err);
  }
};
