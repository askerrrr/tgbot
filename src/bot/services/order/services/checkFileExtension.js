var getFileUrl = require("./getFileURL");

var checkFileExtension = async (ctx, fileId) => {
  var telegramApiFileUrl = await getFileUrl(ctx, fileId);

  var fileExtension = telegramApiFileUrl.split(".")[3].toLowerCase();

  var validExensions = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  if (validExensions.includes(fileExtension)) {
    return { telegramApiFileUrl, fileId };
  }

  return;
};

module.exports = { checkFileExtension };
