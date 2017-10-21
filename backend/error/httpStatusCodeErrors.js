const ERROR_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

const statusCodeFactory = (statusCode, message) => class StatusCodeError extends Error {
  constructor(errorMessage = message) {
    super(errorMessage);
    this.statusCode = statusCode;
  }
};

module.exports = Object.keys(ERROR_CODES).reduce(
  (accumulated, code) => ({
    ...accumulated,
    [ERROR_CODES[code].replace(/ /g, '')]: statusCodeFactory(code, ERROR_CODES[code]),
  }),
  {}
);
