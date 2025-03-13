var shorteningString = (num) => {
  var [start, end] = num.split(".");

  return start + "." + end.slice(0, 2);
};

module.exports = { shorteningString };
