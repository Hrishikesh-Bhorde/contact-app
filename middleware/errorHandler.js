// A custom made middleware to show errors in JSON format

const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "NO Permissions",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error !",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Operation Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("No Error all good");
      break;
  }

  res.json({
    title: "Validation Failed",
    message: err.message,
    stackTrace: err.stack,
  });
};

module.exports = errorHandler;
