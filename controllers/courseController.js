const Course = require('../models/courseSchema');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      course: newCourse
    }
  });
  next();
});

exports.getAllCourse = catchAsync(async (req, res, next) => {
  const course = await Course.find({});
  if (!course) {
    return next(new AppError('There is no Course', 404));
  }
  res.status(200).json({
    status: 'Success',
    numberOfCourse: course.length,
    data: course
  });
});

exports.getCourseById = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      course: course
    }
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true
    // runValidators: true
  });

  if (!course) {
    return next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    numberOfCourse: course.length,
    data: {
      course: course
    }
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError('There is no Course found with this ID', 404));
  }

  res.status(200).json({
    status: 'Course deleted successfully',
    data: null
  });
});
