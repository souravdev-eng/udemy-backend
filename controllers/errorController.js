const AppError = require('../utils/appError');

const handelCastErrorDB = error => {
  const message = `Invalid path: ${error.path} value: ${error.value}`;
  return new AppError(message, 400);
};

const handelUniqueErrorDB = err => {
  const value = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${value.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  });
};

const sendErrorProd = (err, res) => {
  //! Opernational error that we trast
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      err,
      status: 'fail',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.kind === 'ObjectId') error = handelCastErrorDB(error);
    if (error.name === 'ValidationError') error = handelUniqueErrorDB(error);

    sendErrorProd(error, res);
  }
};
