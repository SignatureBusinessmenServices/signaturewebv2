const express = require('express')
const router = express.Router()
const passport = require ('passport')
const UserSign = require('../models/User')

router.get('/adminpage', (req, res, next) => {

  const user = req.user
  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isAdmin == 'No') {
      res.redirect('/admin')
      return
  }

  const id = req.user

  UserSign.findById(id,(err, users) => {
        if (err)
            return next(err)


          res.render('adminhomepage', {users: users, layout: 'layoutadmin'})
      // res.json({users: users})

  })
})

  router.get('/logout', (req, res, next) => {
      req.logout()
      res.redirect('/admin')

  })



module.exports = router
