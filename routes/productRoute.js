const express = require('express');
const {
  createCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
  getCourseById
} = require('../controllers/courseController');

const router = express.Router();

router
  .route('/')
  .post(createCourse)
  .get(getAllCourse);

router
  .route('/:id')
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
