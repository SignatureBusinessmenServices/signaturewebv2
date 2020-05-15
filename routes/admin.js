const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const passport = require ('passport')
const UserSign = require('../models/User')
const Settings = require('../models/settings')
const bcrypt = require('bcryptjs')
const randomString = (length) => {
    let text = ''
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

router.get('/admin', (req, res, next) => {

  Settings.findOne((err,settings) => {

  res.render('login', { settings: settings, message: req.flash ('message') })
  // res.json ({ message: req.flash ('message') })
    })
  })



router.post('/admin', passport.authenticate('localLogin', {
    successRedirect: '/adminpage', failureRedirect:'/admin', failureFlash: true
}))

router.post('/resetpassword', (req, res, next) => {

    UserSign.findOne({ email: req.body.email }, (err, user) => {
        if (err)
            return next(err)

        user.nonce = randomString(8)
        user.passwordResetTime = new Date()
        user.save()

        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'signaturebusinessmenservices@gmail.com',
            pass: 'signaturepass2020'
          }
        });

        const data = {
            to: req.body.email,
            from: '"Signature" <signature.ae>',
            subject: 'Password Reset Request',
            // html: 'Please click <a style="color:red" href="http://192.168.1.217:8000/password-reset?nonce=' + user.nonce + '&id=' + user._id + '">HERE</a> to reset your password. This link is valid for 24 hours.'
            html: 'Please click <a style="color:red" href="https://signature.ae/password-reset?nonce=' + user.nonce + '&id=' + user._id + '">HERE</a> to reset your password. This link is valid for 24 hours.'
        }

        transporter.sendMail(data, (error, info) => {
            if (error)

            // res.render('error')
              return next (error)

            // success:
          res.redirect('/admin')
        })


    })
})

router.get('/password-reset', (req, res, next) => {
    const nonce = req.query.nonce
    if (nonce == null) {
        return next (new Error('Invalid Request'))
    }

    const user_id = req.query.id
    if (user_id == null) {
        return next(new Error('Invalid Request'))
    }

      Settings.findOne((err,settings) => {
              //res.redirect('/assetlist')

              res.render('reset', { settings: settings })

            })
          })

router.post('/password-reset', (req, res, next) => {

    const password = req.body.password
    const hashedPw = bcrypt.hashSync(password, 10)


    const nonce = req.query.nonce
    const id = req.query.id

    UserSign.findOne(id, (err, users) => {
          if (err)
              return next(err)

          UserSign.findOneAndUpdate(id, {password: hashedPw}, { new: true }, (err, users) => {
              if (err)
                  return next(err)

              const data = {
                users: users
              }

              //res.redirect('/assetlist')
              res.redirect('/admin')

          })

      })
})


module.exports = router
