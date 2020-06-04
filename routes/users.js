const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')
mongoose.Schema.Types.Boolean.convertToFalse.add('');

const passport = require ('passport')

const User = require('../models/User')

// LIST OF BLOGS SORTED NEWEST TO LATEST
router.get('/users', (req, res, next) => {

    const user = req.user
    if (user == null) {
        res.redirect('/admin')
        return
    }

    if (user.isSuperAdmin == "No") {

        User.findById( user, (err, users) => {

        res.render('adminhomepage', {layout: 'layoutadmin', users: users, user: req.user, msg: '<h5 class="text-left btn-warning rounded py-2 pl-4 my-2 mr-1">Error: You do not have access to this page!</h5>'})
        // res.redirect('/admin')
        return
        })
    } else {


    User.find({ email: { $nin: [ "jmweb2020@gmail.com" ] } },(err, users) => {

    res.render('users', { users: users, user: req.user, layout: 'layoutadmin'})
    // res.json({blogs: blogs})
  }).sort({timestamp: -1})
}
})

// ADD USER
router.get('/adduser', (req, res, next) => {
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

    res.render('adduser', {users: users, user: req.user, layout: 'layoutadmin'})
})
}
})

// POST REQUEST FOR NEW USER
router.post('/newuser', (req, res, next) => {
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
    //
    // User.findOne({email: req.body.email}, (err, users) =>{
    //   if(err) {
    //     return next(err)
    //   }
    //   if(email != null) {
    //     return next(null, false, req.flash( 'message', 'User already exist, please log in.'))

      const password = req.body.password
      const hashedPw = bcrypt.hashSync(password, 10)

      const newuser = {
        email : req.body.email,
        username: req.body.username,
        password: hashedPw,
      }


      User.create(newuser, (err, newuser) => {
        if(err) {

        res.render('adduser', {layout: 'layoutadmin', users: users, user: req.user, msg: '<h5 class="text-left btn-warning rounded py-2 pl-4 my-2 mr-1">Error: User already exists!</h5>'})
      } else {

        res.redirect('/users')
        // res.json(newuser)
      }
      })

    // })
})
}

})

// EDIT AND VIEW PAGE OF SPECIFIC USER
router.get('/edituser/:_id', (req, res, next) => {


  const user = req.user
  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isSuperAdmin == "No") {
      res.redirect('/adminpage')
      return
  } else {


  const id = req.params

  User.find(id, (err, users)=>{

    res.render('edituser', {users: users, user: req.user, layout: 'layoutadmin'})
    // res.json({blogs: blogs})
  })
}
})

// POST REQUEST OF EDIT USER
router.post('/edituser/:_id', (req, res, next) => {

  const user = req.user

  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isSuperAdmin == "No") {
      res.redirect('/adminpage')
      return
  } else {

    User.find((err, users) =>{

        const id = {"_id" : req.params._id}

                const data = {
                  username: req.body.username,
                  email: req.body.email,
                  isAdmin: req.body.isAdmin,
                  isSuperAdmin: req.body.isSuperAdmin,

                }

                User.findOneAndUpdate(id, data, {new: true}, (err, users) => {
                    if (err)
                        return next(err)

                    res.redirect('/users')
                    // console.log(req.file)
                    // res.json(data)
                })

            })
          }
    })





module.exports = router
