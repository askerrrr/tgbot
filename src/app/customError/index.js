class OrderStatusUpdateError extends Error {
  constructor(message) {
    super(message);
    this.code = 304;
    this.name = "OrderStatusUpdateError";
    this.message = "Cannot update order status";
  }
}

class DeleteUserError extends Error {
  constructor(message) {
    super(message);
    this.code = 304;
    this.name = "DeleteUserError";
    this.message = "Cannot delete user";
  }
}

class DeleteOrderError extends Error {
  constructor(message) {
    super(message);
    this.code = 304;
    this.name = "DeleteOrderError";
    this.message = "Cannot delete order";
  }
}

module.exports = { OrderStatusUpdateError, DeleteUserError, DeleteOrderError };
