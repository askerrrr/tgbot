var checkDocumentExension = (fileName, mimeType) => {
  var fileExension = fileName.split(".").at(-1).toLowerCase();

  return (
    fileExension === "xlsx" &&
    mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
};
module.exports = checkDocumentExension;
