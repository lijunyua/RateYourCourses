const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  index: { 
    type: Number,
    required: true 
  },
  // user username
  author: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    minlegth: 1,
    trim: true,
  },
  // for which course
  course: {
    type: String,
  },
  // which tags are used
  tags: {
    type: Array,
  },
  // main commen t
  comment: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
  },
});

module.exports = { Review };
