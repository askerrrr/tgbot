var { env } = require("../../../env");

module.exports.getFileId = async (bot) => {
  bot.on("message:photo", async (ctx) => {
    var photo = await ctx.message.photo;
    var fileId = photo[photo.length - 1].file_id;
    var fileLink = await ctx.api.getFile(fileId);
    var filePath = fileLink.file_path;
    var fileUrl = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
    await ctx.reply(`${fileUrl}`);
  });
};
