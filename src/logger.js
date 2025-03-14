var pino = require("pino");

var logger = pino(
  { timestamp: pino.stdTimeFunctions.isoTime },
  pino.destination("/var/app_err.log")
);

module.exports = { logger };
