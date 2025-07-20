const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
