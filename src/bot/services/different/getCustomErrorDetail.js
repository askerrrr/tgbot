var getCustomErrorDetail = (e) => {
  var { name, stack, origin, message } = e;

  var errTitle = "\n\nОшибка:  ";
  var errTypePath = "\n\n errType: " + name;
  var stackPath = "\n\n stack: " + stack;
  var msgPath = "\n\n msg: " + message;
  var originPath = "\n\n location: " + origin;

  return errTitle + errTypePath + originPath + msgPath + stackPath;
};

module.exports = getCustomErrorDetail;
