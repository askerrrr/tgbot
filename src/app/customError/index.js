class AppError extends Error {
  constructor(userId, orderId, message, err) {
    super(message);

    this.userId = userId;

    this.orderId = orderId ?? "";

    this.origin = err?.origin ?? "";

    this.code = err?.cause?.code ?? "";

    this.message = message ?? err.message ?? "";
  }
}

var getErrorDetail = ({ code, message, stack, orderId = null }) => {
  var errTitle = "\n\nОшибка приложения:  ";
  var orderIdPath = "\n\n  orderId: " + orderId;
  var codePath = "\n\n  code: " + (code ?? 500);
  var msgPath = "\n\n  msg: " + (message ?? "");
  var stackPath = "\n\n  stacktrace: " + (stack ?? "");

  if (orderId) {
    return errTitle + orderIdPath + codePath + msgPath + stackPath;
  }

  return errTitle + codePath + msgPath + stackPath;
};

module.exports = {
  AppError,
  getErrorDetail,
};
