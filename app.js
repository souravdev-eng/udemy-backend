const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRouter = require('./routes/productRoute');

const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/v1/course', productRouter);

module.exports = app;
