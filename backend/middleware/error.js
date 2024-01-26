const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  // wrong mongodb cast error
  if (err.name === "CastError") {
    const message = `resource not found, Invalid :$(err.path)`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Dupliate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }
  //  expire error
  if (err.name === "tokenExpiredError") {
    const message = `json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
