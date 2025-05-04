class NetworkError extends Error {
  constructor(userId, code, { message, cause, origin }) {
    super(message);

    this.userId = userId;

    this.cause = cause;

    this.code = code ?? cause?.code ?? "";

    this.origin = origin;

    this.name = "NetworkError";

    this.message = message ?? `Request failed with status ${this.code}`;
  }
}

class DatabaseError extends Error {
  constructor(userId, { message, cause, origin }) {
    super(message);

    this.userId = userId;

    this.cause = cause;

    this.code = cause?.code ?? "";

    this.origin = origin;

    this.name = "DatabaseError";

    this.message = message ?? "";
  }
}

module.exports = { NetworkError, DatabaseError };

var customError = { NetworkError, DatabaseError };

module.exports = customError;
