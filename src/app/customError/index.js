class OrderStatusUpdateError extends Error {
  constructor(userId, orderId, message) {
    super(message);

    this.userId = userId;
    this.orderId = orderId;
    this.code = 304;
    this.message = "Cannot update order status";
  }
}

class DeleteUserError extends Error {
  constructor(userId, message) {
    super(message);

    this.userId = userId;
    this.code = 304;
    this.message = "Cannot delete user";
  }
}

class DeleteOrderError extends Error {
  constructor(userId, orderId, message) {
    super(message);

    this.userId = userId;
    this.orderId = orderId;
    this.code = 304;
    this.message = "Cannot delete order";
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
  OrderStatusUpdateError,
  DeleteUserError,
  DeleteOrderError,
  getErrorDetail,
};
