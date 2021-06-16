const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A Course must have a name'],
    unique: true,
    trim: true,
    maxlength: [
      100,
      'A Course name must have less or equal then 40 characters'
    ],
    minlength: [10, 'A Course name must have more or equal then 10 characters']
  },
  description: {
    type: String,
    minLength: [10, 'A course description should not less than 50 characters'],
    maxLength: [
      200,
      'A course description should not more than 200 characters'
    ],
    required: [true, 'A course must have a description']
  },
  longDescription: {
    type: String,
    minLength: [10, 'A course description should not less than 50 characters']
    // maxLength: [
    //   5000,
    //   'A course description should not more than 5000 characters'
    // ]
  },
  image: String,
  price: {
    type: Number,
    min: [299, 'A course price should not be less than 299'],
    max: [1999, 'A course price should not be more than 1999'],
    required: [true, 'A course must have a Price']
  },
  totalStudent: {
    type: Number,
    default: 0
  },
  author: {
    //! it's is bea a db ref type model
    type: String,
    required: [true, 'A course must a author Name']
  },
  coAuthor: {
    //! it's is bea a db ref type model
    type: String
  },
  category: {
    // ! it's is bea a db ref type model
    type: String
    // enum: ['development', 'business', 'it-softwre', 'design', 'marketing']
  },
  subCategory: {
    //! it's is bea a db ref type model
    type: String
    // enum:['web-development', ''],
  },
  ratingsAvg: {
    type: Number,
    min: [1, 'A course rating should not less than 1'],
    max: [5, 'A course rating should not more than 5'],
    default: 4.2
  },
  totalRatings: {
    type: Number,
    default: 2045
  }
});

courseSchema.plugin(uniqueValidator);
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
