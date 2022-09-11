const mongoose = require("mongoose");

const BasicData = mongoose.model("BasicData", {
  reviewID: {
    type: Number,
    required: true
  }
});

module.exports = { BasicData };
