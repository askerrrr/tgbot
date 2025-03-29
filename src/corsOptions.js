var { env } = require("./env");

module.exports = {
  origin: env.main_server,
  methods: "GET,POST,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
