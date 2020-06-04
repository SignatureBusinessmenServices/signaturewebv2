const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const Homepage = require('../models/homepage')

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
  limits:{fileSize: 5000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).fields([{name: 'imageOne'}, {name: 'imageTwo'}, {name: 'imageThree'},{name: 'imageServiced'}, {name: 'imageSetup'}, {name: 'imageCMS'}]);

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

router.get('/edithomepage', (req, res, next) => {

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

    Homepage.findOne((err, home)=>{

    res.render('homepageupdate', {users: users, user: req.user, home: home, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
  })
}
})

// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/edithomepage', (req, res, next) => {

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


    Homepage.find((err, home) => {

        upload(req, res, (err) => {

          if(err){
            // res.redirect('back')
            next(err)

          } else if( typeof req.files.filename !== "undefined" ? req.files.filename : '') {

                const id = {_id: '5ec1307ae2e4dc301c10cf9f'}
                const data = {

                  overlaytitle: req.body.overlaytitle,
                  overlaysubtitle: req.body.overlaysubtitle,
                  aroverlaytitle: req.body.aroverlaytitle,
                  arverlaysubtitle: req.body.arverlaysubtitle,

                  servicetitle: req.body.servicetitle,
                  servicesubtitle: req.body.servicesubtitle,
                  arservicetitle: req.body.arservicetitle,
                  arservicesubtitle: req.body.arservicesubtitle,

                  setuptitle: req.body.setuptitle,
                  setupsubtitle: req.body.setupsubtitle,
                  arsetuptitle: req.body.arsetuptitle,
                  arsetupsubtitle: req.body.arsetupsubtitle,

                  cmstitle: req.body.cmstitle,
                  cmssubtitle: req.body.cmssubtitle,
                  arcmstitle: req.body.arcmstitle,
                  arcmssubtitle: req.body.arcmssubtitle,

                  // imageOne: 'uploads/' + 'imageOne.jpg',
                  // imageTwo: 'uploads/' + 'imageTwo.jpg',
                  // imageThree: 'uploads/' + 'imageThree.jpg',
                  // imageServiced: 'uploads/' + 'imageServiced.jpg',
                  // imageSetup: 'uploads/' + 'imageSetup.jpg',
                  // imageCMS: 'uploads/' + 'imageCMS.jpg',

                  // testimonialImage: 'uploads/' + req.file.filename,
                }

                Homepage.findOneAndUpdate(id, data, {new: true}, (err, home) => {
                    if (err)
                        return next(err)

                // Homepage.create(data,(err,home) =>{
                //   if(err)
                //     return next(err)

                    res.render('homepageupdate', {users: users, user: req.user, home: home, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1"Home Page Updated!</h5>'})
                    console.log(req.file)
                    // res.json(data)
                })

              } else {

                const id = {_id: '5ec1307ae2e4dc301c10cf9f'}
                const data = {
                  overlaytitle: req.body.overlaytitle,
                  overlaysubtitle: req.body.overlaysubtitle,
                  aroverlaytitle: req.body.aroverlaytitle,
                  arverlaysubtitle: req.body.arverlaysubtitle,

                  servicetitle: req.body.servicetitle,
                  servicesubtitle: req.body.servicesubtitle,
                  arservicetitle: req.body.arservicetitle,
                  arservicesubtitle: req.body.arservicesubtitle,

                  setuptitle: req.body.setuptitle,
                  setupsubtitle: req.body.setupsubtitle,
                  arsetuptitle: req.body.arsetuptitle,
                  arsetupsubtitle: req.body.arsetupsubtitle,

                  cmstitle: req.body.cmstitle,
                  cmssubtitle: req.body.cmssubtitle,
                  arcmstitle: req.body.arcmstitle,
                  arcmssubtitle: req.body.arcmssubtitle,

                }
                // Homepage.create(data,(err,home) =>{
                //   if(err)
                //     return next(err)


                Homepage.findOneAndUpdate(id, data, {new: true}, (err, home) => {
                    if (err)
                        return next(err)

                    res.render('homepageupdate', {users: users, user: req.user, home: home, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">Home Page Updated!</h5>'})
                    console.log(req.file)
                    // res.json(data)
                })
              }
            })
    })
  })
  })




module.exports = router
