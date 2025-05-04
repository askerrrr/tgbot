class NetworkError extends Error {
  constructor(userId, code, { message, cause, origin }) {
    super(message);

    this.userId = userId;

    this.cause = cause;

    this.code = code ?? cause?.code ?? "";

    this.name = "NetworkError";

    this.origin = origin;

    this.message = message ?? `Request failed with status ${this.code}`;
  }
}

class DatabaseError extends Error {
  constructor(userId, { message, origin }) {
    super(message);

    this.userId = userId;

    this.message = message;

    this.origin = origin;

    this.name = "DatabaseError";
  }
}

module.exports = { NetworkError, DatabaseError };
