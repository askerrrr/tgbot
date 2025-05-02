var getNetworkErrorDetail = (e) => {
  var type = e.name;
  var stack = e.stack;
  var cause = e.cause;
  var msg = e?.message ?? "";
  var location = e?.location ?? "";
  var code = e?.code ?? cause.code ?? "Отсутствует";

  return (
    "\n\nОшибка:  " +
    "\n\n тип: " +
    type +
    "\n\n код: " +
    code +
    "\n\n текст: " +
    msg +
    "\n\n место: " +
    location +
    "\n\n причина: " +
    cause +
    "\n\n stacktrace: " +
    stack
  );
};

module.exports = getNetworkErrorDetail;
