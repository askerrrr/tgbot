const { join } = require("path");
const { writeFile } = require("./writeFile.js");
const { makeUserDir } = require("./makeUserDir.js");
const { getFileData } = require("./getFileData.js");

var downloadAndSaveFile = async (fileId, order) => {
  var userDir = await makeUserDir(order.userId);

  var docsPath = join(userDir[0], fileId + ".xlsx");
  var imagesPath = join(userDir[1], fileId + ".jpg");

  var dataStream = await getFileData(order.file.url);

  return order.type == "single"
    ? await writeFile(imagesPath, dataStream)
    : await writeFile(docsPath, dataStream);
};

module.exports = { downloadAndSaveFile };
