var getNetworkErrorDetail = (e) => {
  var { name, stack, cause, code, message, location } = e;

  var errTitle = "\n\nОшибка:  ";
  var errNamePath = "\n\n errName: " + name;
  var stackPath = "\n\n stack: " + stack;
  var causePath = "\n\n cause: " + (cause ?? "");
  var msgPath = "\n\n msg: " + message;
  var locationPath = "\n\n location: " + location;
  var codePath = "\n\n code: " + (code || cause.code || "");

  return (
    errTitle +
    errNamePath +
    codePath +
    msgPath +
    locationPath +
    causePath +
    stackPath
  );
};

module.exports = getNetworkErrorDetail;
