const mongoose = require("mongoose");

const Tag = mongoose.model("Tag", {
  name: {
    type: String,
    required: true,
    minlegth: 1,
    unique: true,
    trim: true,
  },
  usedIn: {
    type: Array,
    default: []
  },
});

module.exports = { Tag };
