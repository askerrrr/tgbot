module.exports.shorteningString = (num) => {
  var [start, end] = num.split(".");

  return start + "." + end.slice(0, 2);
};
