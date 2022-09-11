const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
  code: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
    unique: true,
  },
  prerequisite: {
    type: Array,
  },
  rating: {
    type: Number,
    default: null,
  },
  tags: {
      type: Array,
  },
  // which review index belongs to this course
  reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Review',
      required: false
  },
  // who wrote review for this course 
  authors: {
    type: Array
  }

});

module.exports = { Course };