/**
 * Express middleware that adds a custom error handler to response
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
module.exports = (req, res, next) => {
  res.handleError = (error) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).send();
  };

  next();
};
