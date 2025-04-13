var pino = require("pino");

var logger = pino(
  { timestamp: pino.stdTimeFunctions.isoTime },
  pino.destination("/var/bot_error.log")
);

module.exports = { logger };
