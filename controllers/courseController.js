const Course = require('../models/courseSchema');

exports.createCourse = async (req, res, next) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: 'Success',
      course: {
        data: newCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
      message: error.message,
    });
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const course = await Course.find({});
    res.status(200).json({
      status: 'Success',
      numberOfCourse: course.length,
      course: {
        data: course,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
      message: error.message,
    });
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({
        status: 'Fail',
        message: 'Course not find',
      });
    }
    res.status(200).json({
      status: 'Success',
      course: {
        data: course,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      res.status(404).json({
        status: 'Fail',
        message: 'Course not find',
      });
    }

    res.status(200).json({
      status: 'Success',
      numberOfCourse: course.length,
      course: {
        data: course,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404).json({
        status: 'Fail',
        message: 'Course not find',
      });
    }

    res.status(200).json({
      status: 'Course deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
      message: error.message,
    });
  }
};
