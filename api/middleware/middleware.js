function errorHandling(err, req, res, next) { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  }

module.exports = {errorHandling}