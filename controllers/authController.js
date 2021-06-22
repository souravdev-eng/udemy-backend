const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signInWithToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRECT, {
    expiresIn: process.env.JWT_EXPIRATION
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConforim: req.body.passwordConforim,
    passwordCangedAt: req.body.passwordCangedAt
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

  const token = signInWithToken(user._id, user.email, user.name);
  res.status(200).json({
    status: 'success',
    token,
    user: user
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in please log in first', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRECT);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('There is no user with this email', 404));
  }

  if (currentUser.passwordChageAfter(decoded.iat)) {
    return next(
      new AppError('User recently chage password! Please login again', 401)
    );
  }
  req.user = currentUser;
  next();
});
