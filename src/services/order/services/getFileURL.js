var { env } = require("../../../env");

module.exports.getFileUrl = async (ctx, fileId) => {
  try {
    var fileLink = await ctx.api.getFile(fileId);
    var filePath = fileLink.file_path;
    var fileURL =
      "https://api.telegram.org/file/bot" + env.bot_token + "/" + filePath;
    return fileURL;
  } catch (err) {
    console.log(err);
  }
};
