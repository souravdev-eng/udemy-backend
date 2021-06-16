const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

// routes
app.use('/api/v1/course', productRouter);
app.use('/api/v1/user', userRouter);

//? Global unhandel middleare's

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find this url ${req.originalUrl} on the server!`, 404)
  );
});

//* Global error handeling middleware
app.use(globalErrorHandler);

module.exports = app;
