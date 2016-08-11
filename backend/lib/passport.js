const passport = require('passport')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const BasicStrategy = require('passport-http').BasicStrategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')

const jwtCert = {
  key: fs.readFileSync('./certs/jwt.key', { encoding: 'utf8' }),
  pub: fs.readFileSync('./certs/jwt.pub', { encoding: 'utf8' })
}

passport.use(new BasicStrategy(
  (username, password, done) => {
    username = username.toLowerCase()
    User.findOne({ $or: [{ username: username }, { "email.mail": username }] }, (err, user) => {
      if (err) return done(err)

      if (!user) {
        return done({ message: 'Incorrect username or password', error: 'invalidCredentials' }, false)
      } else {
        bcrypt.compare(password, user.password, (err, valid) => {
          if (err) return done(err)
          if (valid) {
            if (!user.email.verified) {
              return done({ "message": 'Unverified email address', "error": 'unverifiedEmail' }, false)
            } else {
              done(null, user)
            }
          }
          else return done({ message: 'Incorrect username or password', error: 'invalidCredentials' }, false)
        })
      }
    })
  })
)

passport.use(new BearerStrategy(
  (token, done) => {
    jwt.verify(token, jwtCert.pub, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) return done(err, false);
      if (decoded) {
        done(null, decoded)
      } else {
        return done(null, false)
      }
    })
  })
)

module.exports = passport