const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')
mongoose.Schema.Types.Boolean.convertToFalse.add('');

const passport = require ('passport')

const Settings = require('../models/settings')
const User = require('../models/User')


// EDIT AND VIEW BUSINESS SETTINGS
router.get('/settingsupdate', (req, res, next) => {

  const user = req.user
  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isSuperAdmin == "No") {
      // res.redirect('/adminpage')
      User.find((err, users) => {
      res.render('adminhomepage', {layout: 'layoutadmin', users: users, user: req.user, msg: '<h5 class="text-left btn-warning rounded py-2 pl-4 my-2 mr-1">Error: You do not have access to this page!</h5>'})

        })
  } else {

User.find((err, users) => {

  Settings.findOne((err, settings)=>{

    res.render('settingsupdate', {settings: settings, users: users, user: req.user, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
}
})


// POST REQUEST FOR settingsupdate
router.post('/settingsupdate', (req, res, next) => {
  const user = req.user

  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isSuperAdmin == "No") {
      res.redirect('/adminpage')
      return
  } else {

  User.find((err, users) => {

      const settings = req.body
      const id = {_id: '5ebd3d748de563247c841b35'}

      Settings.findOneAndUpdate(id, settings, {new: true}, (err, settings) => {
        if(err)
         return next(err)

        res.render('settingsupdate', {layout: 'layoutadmin', users: users, settings: settings, user: req.user, msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">Business Settings Updated!</h5>'})

      })

    // })
})

}
})




module.exports = router
