const express = require('express')
const router = express.Router()

const passport = require ('passport')

const Testimonials = require('../models/testimonials')
const User = require('../models/User')

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('testimonialImage');

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



// ADD NEW TESTIMONIAL
router.get('/addtestimonial', (req, res, next) => {


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

    res.render('addtestimonial', {users: users, layout: 'layoutadmin'})
})
})

// POST REQUEST FOR NEW TESTIMONIAL
router.post('/newtestimonial', async (req,res) => {

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

  upload(req, res, (err) => {
      if(err){
        // res.redirect('/add')
        res.render('addtestimonial', {layout: 'layoutadmin', users: users, msg: err})

      } else if (req.file == undefined) {

          res.render('addtestimonial', {layout: 'layoutadmin', users: users, msg: '<h5 class="text-left btn-warning rounded pl-4 mt-3 py-2">Error: No Image Selected!</h5>'})

        } else {


            const file = req.file.filename
            const testimonials = {
              company: req.body.company,
              person: req.body.person,
              testimonial: req.body.testimonial,
              arcompany: req.body.arcompany,
              arperson: req.body.arperson,
              artestimonial: req.body.artestimonial,
              testimonialImage: 'uploads/' + file,

            }

            Testimonials.create(testimonials,(err,data) =>{
              if(err)
                return next(err)

        // res.render('testblog', {content: data, layout: 'layouten'})
        // res.json(blogs)
        res.redirect('/testimonialslist')
        })
      }

  })
})
})

// LIST OF TESTIMONIALS SORTED NEWEST TO LATEST
router.get('/testimonialslist', (req, res, next) => {

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


    Testimonials.find((err, testimonials)=>{

    res.render('testimonialslist', {testimonials: testimonials, users: users, layout: 'layoutadmin'})
    // res.json({testimonials: testimonials})
  }).sort({timestamp: -1})
})
})

// EDIT AND VIEW PAGE OF SPECIFIC BLOG
router.get('/testimonialupdate/:_id', (req, res, next) => {


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

  const id = req.params

  Testimonials.find(id, (err, testimonials)=>{

    res.render('testimonialupdate', {testimonials: testimonials, users: users, layout: 'layoutadmin'})
    // res.json({blogs: blogs})
  })
})
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/edittestimonial/:_id', (req, res, next) => {


  const user = req.user

  if (user == null) {
      res.redirect('/admin')
      return
  }

  if (user.isAdmin == 'No') {
      res.redirect('/admin')
      return
  }

    Testimonials.find((err, testimonials) => {

        const id = {"_id" : req.params._id}

        upload(req, res, (err) => {

          if(err){
            res.redirect('back')


          } else if(req.file) {

                const data = {
                  company: req.body.company,
                  person: req.body.person,
                  testimonial: req.body.testimonial,
                  arcompany: req.body.arcompany,
                  arperson: req.body.arperson,
                  artestimonial: req.body.artestimonial,
                  testimonialImage: 'uploads/' + req.file.filename,
                }

                Testimonials.findOneAndUpdate(id, data, {new: true}, (err, testimonials) => {
                    if (err)
                        return next(err)

                    res.redirect('back')
                    // console.log(req.file)
                    // res.json(data)
                })

              } else {

                const data = {
                  company: req.body.company,
                  person: req.body.person,
                  testimonial: req.body.testimonial,
                  arcompany: req.body.arcompany,
                  arperson: req.body.arperson,
                  artestimonial: req.body.artestimonial,

                }

                Testimonials.findOneAndUpdate(id, data, {new: true}, (err, testimonials) => {
                    if (err)
                        return next(err)

                    res.redirect('back')
                    // console.log(req.file)
                    // res.json(data)
                })
              }
            })
    })
  })




module.exports = router
