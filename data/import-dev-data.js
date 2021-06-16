const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Course = require('../models/courseSchema');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful'));

const Courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courseDataV1.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Course.create(Courses);
    console.log('Course is imported sucssesfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Course.deleteMany();
    console.log('Course is deleted sucssesfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
