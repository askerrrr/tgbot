var getDatabaseErrorDetail = (e) => {
  var type = e.name;
  var stack = e.stack;
  var msg = e.message;
  var location = e.funcName;

  return (
    "\n\nОшибка:  " +
    "\n\n тип: " +
    type +
    "\n\n текст: " +
    msg +
    "\n\n место: " +
    location +
    "\n\n stacktrace: " +
    stack
  );
};

module.exports = getDatabaseErrorDetail;
