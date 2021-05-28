const Course = require('../models/courseSchema');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: 'Success',
    course: {
      data: newCourse,
    },
  });
  next();
});

exports.getAllCourse = catchAsync(async (req, res, next) => {
  const course = await Course.find({});

  res.status(200).json({
    status: 'Success',
    numberOfCourse: course.length,
    course: {
      data: course,
    },
  });
  next();
});

exports.getCourseById = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    course: {
      data: course,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    numberOfCourse: course.length,
    course: {
      data: course,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Course deleted successfully',
    data: null,
  });
});
