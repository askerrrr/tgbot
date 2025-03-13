var { getFileUrl } = require("./getFileURL");

var checkFileExtension = async (ctx, fileId) => {
  var fileUrl = await getFileUrl(ctx, fileId);

  var fileExtension = fileUrl.split(".")[3].toLowerCase();

  var extensionArr = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  return extensionArr.includes(fileExtension) ? fileUrl + "::" + fileId : null;
};

module.exports = { checkFileExtension };
