const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager'], 
    default: 'manager'
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null // Set to null initially
  },
  lastUpdate: {
    type: Date,
    default: null // Set to null initially
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userSchema);