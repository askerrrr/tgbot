var { getFileUrl } = require("./getFileURL");

var checkFileExtension = async (ctx, fileId) => {
  var telegramApiFileUrl = await getFileUrl(ctx, fileId);

  var fileExtension = telegramApiFileUrl.split(".")[3].toLowerCase();

  var extensionArr = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  return extensionArr.includes(fileExtension)
    ? { telegramApiFileUrl, fileId }
    : null;
};

module.exports = { checkFileExtension };
