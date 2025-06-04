const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    refreshToken: {
      type: String,
      default: null
    }
})

module.exports = User
