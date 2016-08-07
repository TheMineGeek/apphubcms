const passport = require('passport')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const BasicStrategy = require('passport-http').BasicStrategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')

const jwtCert = {
  key: fs.readFileSync('./certs/jwt.key', {encoding : 'utf8'}),
  pub: fs.readFileSync('./certs/jwt.pub', {encoding : 'utf8'})
}

passport.use(new BasicStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err)

      if (!user) {
        return done(null, false, 'Incorrect username or password')
      } else if (!user.email.verified) {
        return done(null, false, 'Unverified email address')
      } else {
        bcrypt.compare(password, user.password, (err, valid) => {
          if (err) return done(err)
          console.log(valid)
          if (valid) done(null, user)
          else return done(null, false, 'Incorrect username or password')
        })
      }
    })
  })
  )

passport.use(new BearerStrategy(
  (token, done) => {
    console.log(token)
    jwt.verify(token, jwtCert.pub, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) return done(err);
      if (decoded) {
        done(null, decoded)
      } else {
        return done(null, false)
      }
    })
  })
  )

module.exports = passport