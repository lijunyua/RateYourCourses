/* User mongoose model */
const mongoose = require("mongoose");

const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  permission: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    default: "user",
  },
  year: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  coursesTaken: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    required: false
  },
  preferredTags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tag',
    required: false
  },
  review: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    required: false
  }
});

UserSchema.pre('save', function(next) {
  const user = this; 
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
  const User = this
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject(null)
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user)
        } else {
          reject(null)
        }
      })
    })
  })
}

const User = mongoose.model('User', UserSchema)
module.exports = { User };