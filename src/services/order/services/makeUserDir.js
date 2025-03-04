const { join } = require("path");
const { mkdir } = require("fs/promises");

var makeUserDir = async (userId) => {
  var userDir = join("/var", "www", "userFiles", userId);
  var dirs = ["docs", "images"];

  try {
    await mkdir(userDir, { recursive: true });

    await Promise.all(
      dirs.map((dir) => mkdir(userDir + "/" + dir, { recursive: true }))
    );

    return dirs.map((dir) => join(userDir, dir));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { makeUserDir };
