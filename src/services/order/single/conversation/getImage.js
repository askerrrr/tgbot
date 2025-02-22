var { checkFileExtension } = require("../../services/checkFileExtension");

module.exports.getImage = async (ctx, conversation) => {
  try {
    await ctx.reply("Отправьте фото товара");

    var message = await conversation.wait();

    if (!message.msg.photo) {
      await ctx.reply("Что то не похоже на фото, попробуйте еще раз");
      return;
    }

    var fileId = message.msg.photo.at(-1).file_id;

    var validFile = await checkFileExtension(ctx, fileId);

    if (!validFile) {
      await ctx.reply(
        "Что то не похоже на ожидаемый формат фото, попробуйте еще раз"
      );
      return;
    }

    return validFile;
  } catch (err) {
    console.log(err);
  }
};
