module.exports.getDateAndTime = () => {
  var date = new Date();

  var s = date.getSeconds();
  s = s < 10 ? "0" + s : s;

  var m = date.getMinutes();
  m = m < 10 ? "0" + m : m;

  var h = date.getHours();
  h = h < 10 ? "0" + h : h;

  var d = date.getDate();
  d = d < 10 ? "0" + d : d;

  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  var y = date.getFullYear();

  return {
    time: () => `${h}:${m}:${s}`,
    date: () => `${d}.${month}.${y}`,
    fullDateTime: () => `${d}.${month}.${y} - ${h}:${m}:${s} `,
  };
};
