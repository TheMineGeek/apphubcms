const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User