const { join } = require("path");
const { writeFile } = require("./writeFile.js");
const { makeUserDir } = require("./makeUserDir.js");
const { getFileData } = require("./getFileData.js");

var downloadAndSaveFile = async (userId, fileId, url, order) => {
  var userDir = await makeUserDir(userId);

  var docsPath = join(userDir[0], fileId + ".xlsx");
  var imagesPath = join(userDir[1], fileId + ".jpg");

  var dataStream = await getFileData(url);

  return order.type == "single"
    ? await writeFile(imagesPath, dataStream)
    : await writeFile(docsPath, dataStream);
};

module.exports = { downloadAndSaveFile };
