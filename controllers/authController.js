// const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signInWithToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: process.env.JWT_EXPIRATION
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConforim: req.body.passwordConforim
  });
  const token = signInWithToken(newUser._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Cheack if there is an email and password
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter your email and password', 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Your email or password is incorrect', 401));
  }

  const token = signInWithToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
