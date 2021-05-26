const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [100, 'A course title should not more than 50 characters'],
      required: [true, 'A course must have a name'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      minLength: [
        10,
        'A course description should not less than 50 characters',
      ],
      maxLength: [
        200,
        'A course description should not more than 200 characters',
      ],
      required: [true, 'A course must have a description'],
    },
    image: String,
    price: {
      type: Number,
      min: [299, 'A course price should not be less than 299'],
      max: [1999, 'A course price should not be more than 1999'],
      required: [true, 'A course must have a Price'],
    },
    author: {
      //! it's is bea a db ref type model
      type: String,
      required: [true, 'A course must a author Name'],
    },
    coAuthor: {
      //! it's is bea a db ref type model
      type: String,
    },
    category: {
      //! it's is bea a db ref type model
      type: String,
    },
    subCategory: {
      //! it's is bea a db ref type model
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, 'A course rating should not less than 1'],
      max: [5, 'A course rating should not more than 5'],
      default: 4.2,
    },
    totalRatings: {
      type: Number,
      default: 2045,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
