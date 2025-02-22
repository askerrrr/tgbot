var { getFileUrl } = require("./getFileURL");

module.exports.checkFileExtension = async (ctx, fileId) => {
  var fileUrl = await getFileUrl(ctx, fileId);

  var fileExtension = fileUrl.split(".")[3].toLowerCase();

  var extensionArr = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  return extensionArr.includes(fileExtension) ? `${fileUrl}::${fileId}` : null;
};
