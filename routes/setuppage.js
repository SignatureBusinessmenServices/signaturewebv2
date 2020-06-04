const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const Setup = require('../models/setuppage')
const Homepage = require('../models/homepage')
const Sidebar = require('../models/sidebar')

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '.jpg')
  }
})

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).fields([{name: 'setuppageimage'}]);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('<h5 class="text-left btn-warning rounded pl-4 py-2 mt-3">Error: Images Files Only!</h5>')
  }
}

router.get('/editsetuppage', (req, res, next) => {

  const user = req.user
  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isSuperAdmin == 'No') {
      res.redirect('/adminpage')
      // res.redirect('/admin')
      return

  } else {

    User.find((err, users) => {

    Setup.findOne((err, setup)=>{

      Sidebar.findOne((err, sidebars)=>{

    res.render('setuppageupdate', {users: users, user: req.user, sidebars: sidebars, setup: setup, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
  })
}
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editsetuppage', (req, res, next) => {

  const user = req.user

  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isAdmin == 'No') {
      res.redirect('/admin')
      return
  }

  User.find((err, users) => {

    Sidebar.findOne((err, sidebars)=>{

      Setup.find((err, setup) => {

        upload(req, res, (err) => {

          if(err)
            // res.redirect('back')
            next(err)

                const id = {_id: '5ed4e3edc362b74e6582a997'}
                const data = {
                  setuptitle: req.body.setuptitle,
                  setupdescription: req.body.setupdescription,
                  setupsubtitle: req.body.setupsubtitle,
                  setupsubtitledescription: req.body.setupsubtitledescription,

                  arsetuptitle: req.body.arsetuptitle,
                  arsetupdescription: req.body.arsetupdescription,
                  arsetupsubtitle: req.body.arsetupsubtitle,
                  arsetupsubtitledescription: req.body.arsetupsubtitledescription,

                }


                Setup.findOneAndUpdate(id, data, {new: true}, (err, setup) => {

                    if (err)
                        return next(err)


                const sidebarid = {_id: '5ed4a7076a5b8c3871a5b38c'}


                  Sidebar.findOneAndUpdate(sidebarid, req.body, {new: true}, (err, sidebars) => {

                            if (err)
                                return next(err)

                    res.render('setuppageupdate', {users: users, user: req.user, setup: setup, sidebars: sidebars, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">Business Setup Page Updated!</h5>'})
                    // console.log(req.file)
                    // res.json(data)
                })

            })
    })
  })
  })
})
  })




module.exports = router
