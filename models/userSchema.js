const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'Email is not valid'],
    required: [true, 'Please provide your valid email']
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'co-teacher', 'student'],
    default: 'student'
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    select: false
  },
  passwordConforim: {
    type: String,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Password must be same'
    },
    required: [true, 'Please provide your password conforim']
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConforim = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;
