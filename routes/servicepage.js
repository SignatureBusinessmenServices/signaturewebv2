const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const Service = require('../models/servicepage')
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
}).fields([{name: 'locationimage'}, {name: 'officeimage'}, {name: 'gallery1'}, {name: 'gallery2'}, {name: 'gallery3'},{name: 'gallery4'},{name: 'gallery5'},{name: 'gallery6'}]);

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

router.get('/editservicepage', (req, res, next) => {

  const user = req.user
  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isAdmin == 'No') {
      // res.redirect('/adminpage')
      res.redirect('/admin')
      return

  } else {

    User.find((err, users) => {

    Service.findOne((err, services)=>{

      Sidebar.findOne((err, sidebars)=>{

    res.render('servicepageupdate', {users: users, user: req.user, sidebars: sidebars, services: services, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
  })
}
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editservicepage', (req, res, next) => {

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

    Service.find((err, services) => {

        upload(req, res, (err) => {

          if(err)
            // res.redirect('back')
            next(err)

                const id = {_id: '5ecfcf4a291e82040cefd9dd'}
                const data = {
                  servicetitle: req.body.servicetitle,
                  servicedescription: req.body.servicedescription,
                  locationtitle: req.body.locationtitle,
                  locationdescription: req.body.locationdescription,
                  officetitle: req.body.officetitle,
                  officedescription: req.body.officedescription,

                  arservicetitle: req.body.arservicetitle,
                  arservicedescription: req.body.arservicedescription,
                  arlocationtitle: req.body.arlocationtitle,
                  arlocationdescription: req.body.arlocationdescription,
                  arofficetitle: req.body.arofficetitle,
                  arofficedescription: req.body.arofficedescription,


                }

                Service.findOneAndUpdate(id, data, {new: true}, (err, services) => {

                    if (err)
                        return next(err)


                const sidebarid = {_id: '5ed4a7076a5b8c3871a5b38c'}



                  Sidebar.findOneAndUpdate(sidebarid, req.body, {new: true}, (err, sidebars) => {

                            if (err)
                                return next(err)

                    res.render('servicepageupdate', {users: users, user: req.user, services: services, sidebars: sidebars, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">Serviced Office Page Updated!</h5>'})
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
