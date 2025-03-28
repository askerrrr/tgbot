var { env } = require("../../../env");

var getFileUrl = async (ctx, fileId) => {
  try {
    var fileLink = await ctx.api.getFile(fileId);
    var filePath = fileLink.file_path;
    var fileURL =
      "https://api.telegram.org/file/bot" + env.main_bot_token + "/" + filePath;
    return fileURL;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getFileUrl };
