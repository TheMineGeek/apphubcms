const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    displayName: String,
    email: {
      mail: String,
      verification: String,
      verified: {
        type: Boolean,
        default: false
      }
    },
    signinDate: {
      type: Date,
      default: Date.now
    },
    permissions: [mongoose.Schema.Types.Mixed]
})

var User = mongoose.model('User', UserSchema)

module.exports = User