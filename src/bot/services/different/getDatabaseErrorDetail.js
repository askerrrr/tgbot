var getDatabaseErrorDetail = (e) => {
  var { name, stack, funcName, message } = e;

  var errTitle = "\n\nОшибка:  ";
  var errTypePath = "\n\n errType: " + name;
  var stackPath = "\n\n stack: " + stack;
  var msgPath = "\n\n msg: " + message;
  var funcNamePath = "\n\n location: " + funcName;

  return errTitle + errTypePath + funcNamePath + msgPath + stackPath;
};

module.exports = getDatabaseErrorDetail;
