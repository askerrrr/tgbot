var checkDocType = (fileName, mimeType) =>
  fileName.split(".").at(-1).toLowerCase() === "xlsx" &&
  mimeType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

module.exports = { checkDocType };
