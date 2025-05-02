class NetworkError extends Error {
  constructor(userId, code, location, { message, cause }) {
    super(message);

    this.code = code;
    this.userId = userId;
    this.cause = cause;
    this.location = location;
    this.name = "NetworkError";
    this.message = message ?? `Request failed with status ${this.code}`;
  }
}

class DatabaseError extends Error {
  constructor(userId, funcName, message) {
    super(message);

    this.userId = userId;
    this.message = message;
    this.funcName = funcName;
    this.name = "DatabaseError";
  }
}

module.exports = { NetworkError, DatabaseError };
