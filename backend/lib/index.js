const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const https = require('https')
const fs = require('fs')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const mpromise = require('mpromise')

const app = express()
const User = require('./models/User.js')
const httpsOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
}
const jwtCert = fs.readFileSync('./certs/jwt.key')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/test', (req, res) => {
    res.send('Everything is okay :)')
})

mongoose.connect('mongodb://localhost:27017/apphubcms')

passport.use(new BasicStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err)

            if (!user) {
                return done(null, false, 'Incorrect username or password')
            } else {
                bcrypt.compare(password, user.password, (err, valid) => {
                    if (err) throw err
                    if (valid) done(null, user)
                    else return done(null, false, 'Incorrect username or password')
                })
            }
        })
    })
)

app.post('/login',
    passport.authenticate('basic', { session: false }),
    function (req, res) {
        console.log(JSON.stringify(req.user))
        let token = jwt.sign(JSON.stringify(req.user), jwtCert, { algorithm: 'RS256' }, (err, token) => {
            if (err) throw err
            res.json({ token: token })
        })
    }
)

app.post('/signup', (req, res) => {
    console.log(req.body)
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) throw err
        if (user) {
            res.json({ error: true, message: 'Désolé, ce nom d\'utilisateur est déjà utilisé' })
        }
        else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) throw err
                if (user) {
                    res.json({ error: true, message: 'Désolé, cette adresse mail est déjà utilisée' })
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            var _user = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                            })

                            var userSaving = _user.save((err) => {
                                if (err) throw err
                                else res.json({ error: false })
                            })
                        });
                    });
                }
            })
        }
    })
})

https.createServer(httpsOptions, app).listen(3000)