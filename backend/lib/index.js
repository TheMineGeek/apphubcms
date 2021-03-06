'use strict'

//const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const express = require('express')
const https = require('https')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const mpromise = require('mpromise')
const morgan = require('morgan')
const flash = require('connect-flash')
const app = express()
const User = require('./models/User.js')
const httpsOptions = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
}
const jwtCert = {
  key: fs.readFileSync('./certs/jwt.key', { encoding: 'utf8' }),
  pub: fs.readFileSync('./certs/jwt.pub', { encoding: 'utf8' })
}

const passport = require('./passport.js')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
app.use(flash())

app.use(morgan('combined'))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/test', (req, res) => {
  res.send('Everything is okay :)')
})

mongoose.connect('mongodb://127.0.0.1:27017/apphubcms')

app.post('/login',
  (req, res, next) => {
    passport.authenticate('basic', { failWithError: true, failureFlash: true }, (err, user, info) => {
      if (err) {
        if (err.error === 'invalidCredentials') res.send(401)
        else if (err.error === 'unverifiedEmail') res.json({ success: false, error: 'unverifiedEmail' })
      } else {
        if (user) {
          jwt.sign(JSON.stringify(user), jwtCert.key, { algorithm: 'RS256' }, (err, token) => {
            if (err) throw err
            res.json({ success: true, token: token })
          })
        }
      }
    })(req, res, next)
  }
)

app.post('/signup',
  (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err
      if (user) {
        res.json({ error: true, errorType: 'username', message: 'Nom d\'utilisateur est déjà utilisé' })
      }
      else {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) throw err
          if (user) {
            res.json({ error: true, errorType: 'email', message: 'Adresse mail est déjà utilisée' })
          } else {
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(req.body.password, salt, function (err, hash) {
                var _user = new User({
                  username: req.body.username.toLowerCase(),
                  displayName: req.body.username,
                  "email.mail": req.body.email.toLowerCase(),
                  password: hash
                })

                _user.save((err) => {
                  if (err) throw err
                  else res.json({ error: false })
                })
              });
            });
          }
        })
      }
    })
  }
)

app.post('/hasPermission/:app/:permission',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

app.post('/checkToken',
  (req, res) => {
    passport.authenticate('bearer', (err, user, info) => {
      if(err) {
        res.send(false)
      } else {
        res.send(true)
      }
    })(req, res)      
  }
)

app.get('/users',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    /* CHECK PERMISSIONS */
    User.find({}, (err, users) => {
      res.json(users)
    }).limit(20)
  }
)

https.createServer(httpsOptions, app).listen(3000)