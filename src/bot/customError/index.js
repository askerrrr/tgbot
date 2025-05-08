class NetworkError extends Error {
  constructor(userId, message, code, origin) {
    super(message);

    this.userId = userId;

    this.code = code ?? "";

    this.origin = origin;

    this.name = this.constructor.name;

    this.message = message ?? `Request failed with status ${this.code}`;
  }
}

class DatabaseError extends Error {
  constructor({ message, cause, origin }, userId, orderId) {
    super(message);

    this.userId = userId;

    this.orderId = orderId ?? "";

    this.cause = cause;

    this.code = cause?.code ?? "";

    this.origin = origin;

    this.message = message ?? "";

    this.name = this.constructor.name;
  }
}
var customError = [NetworkError, DatabaseError];

module.exports = { NetworkError, DatabaseError, customError };
