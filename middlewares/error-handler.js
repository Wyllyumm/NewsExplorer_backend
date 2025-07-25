const BadRequestError = require("../errors/badRequestError.js");
const ConflictError = require("../errors/conflictError.js");
const ForbiddenError = require("../errors/forbiddenError.js");
const NotFoundError = require("../errors/notFoundError.js");
const UnauthorizedError = require("../errors/unauthorizedError.js");
const InternalServerError = require("../errors/internalServerError.js");

function errorHandler(err, req, res, next) {
  console.error(err);
  const { statusCode = 500 } = err;
  const message = err.message || "An error has occured on the server";
  res.status(statusCode).send({ message });
  return next(err);
}

function handleRepeatErrors(err, res, next) {
  if (err.code === 11000) {
    next(new ConflictError(err.message));
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    next(new BadRequestError(err.message));
  }
  if (err.name === "DocumentNotFoundError") {
    next(new NotFoundError(err.message));
  }
  if (err.name === "ForbiddenError") {
    next(new ForbiddenError(err.message));
  }
  if (err.message.includes("Incorrect email or password")) {
    next(new UnauthorizedError(err.message));
  }
  if (err.name === "InternalServerError") {
    next(new InternalServerError(err.message));
  }
  return next(err);
}

module.exports = { errorHandler, handleRepeatErrors };
