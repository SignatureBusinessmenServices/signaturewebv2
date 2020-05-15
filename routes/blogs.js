const express = require('express')
const router = express.Router()

const passport = require ('passport')

const blog = require('../models/blogs')
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
}).single('blogImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('<h5 class="text-left btn-warning rounded pl-4 py-2">Error: Images Files Only!</h5>')
  }
}

// ADD NEW BLOG
router.get('/add', (req, res, next) => {


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

    res.render('blogadd', {users: users, user: req.user, layout: 'layoutadmin'})
})
})


// LIST OF BLOGS SORTED NEWEST TO LATEST
router.get('/bloglistedit', (req, res, next) => {

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


    blog.find((err, blogs)=>{

    res.render('bloglisteditpage', {blogs: blogs, user: req.user, users: users, layout: 'layoutadmin'})
    // res.json({blogs: blogs})
  }).sort({timestamp: -1})
})
})
// router.get('/bloglistedit/:_id', (req, res, next) => {
//   const user = req.user
//   if (user == null) {
//       res.redirect('/admin')
//       return
//   }
//
//   if (user.isAdmin == false) {
//       res.redirect('/admin')
//       return
//   }
//
//   const id = req.params
//
//   blog.find(id, (err, blogs)=>{
//
//     res.render('blogitemedit', {blogs: blogs, layout: 'layoutadmin'})
//     // res.json({blogs: blogs})
//   })
// })


// EDIT AND VIEW PAGE OF SPECIFIC BLOG
router.get('/blogupdate/:_id', (req, res, next) => {


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

  blog.find(id, (err, blogs)=>{

    res.render('blogupdate', {blogs: blogs, user: req.user, users: users, layout: 'layoutadmin'})
    // res.json({blogs: blogs})
  })
})
})

//
//
// router.get('/bloglistedit', (req, res, next) => {
//   const user = req.user
//   if (user == null) {
//       res.redirect('/admin')
//       return
//   }
//
//   if (user.isAdmin == false) {
//       res.redirect('/admin')
//       return
//   }
//
//   blog.find( (err, blogs)=>{
//
//     res.render('bloglisteditpage', {blogs: blogs, layout: 'layoutadmin'})
//     // res.json({blogs: blogs})
//   }).sort({timestamp: -1})
// })

// POST REQUEST FOR NEW BLOG
router.post('/newblog', async (req,res) => {


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
        res.render('blogadd', {layout: 'layoutadmin', users: users, msg: err})

      } else if (req.file == undefined) {

          res.render('blogadd', {layout: 'layoutadmin', user: req.user, users: users, msg: '<h5 class="text-left btn-warning rounded pl-4 py-2">Error: No Image Selected!</h5>'})

        } else {

        blog.find().countDocuments(null, (err, item_count) => {
          if (err)
            return next(err)

            const file = req.file.filename
            const blogs = {
              title: req.body.title,
              date: req.body.date,
              headline: req.body.headline,
              details: req.body.details,
              blogImage: 'uploads/' + file,
              collapseId: 'collapse'+item_count,
              collapseHref: '#collapse'+item_count,
            }

            blog.create(blogs,(err,data) =>{
              if(err)
                return next(err)

        // res.render('testblog', {content: data, layout: 'layouten'})
        // res.json(blogs)
        res.redirect('/bloglistedit')
        })
      })
    }
  })
})
})

// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editblog/:_id', (req, res, next) => {


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

        const id = {"_id" : req.params._id}

        upload(req, res, (err) => {

          if(err){
            res.redirect('back')


          } else if(req.file) {

                const data = {
                  title: req.body.title,
                  date: req.body.date,
                  headline: req.body.headline,
                  details: req.body.details,
                  blogImage: 'uploads/' + req.file.filename,
                }

                blog.findOneAndUpdate(id, data, {new: true}, (err, blogs) => {
                    if (err)
                        return next(err)

                    res.redirect('back')
                    // console.log(req.file)
                    // res.json(data)
                })

              } else {

                const data = {
                  title: req.body.title,
                  date: req.body.date,
                  headline: req.body.headline,
                  details: req.body.details,

                }

                blog.findOneAndUpdate(id, data, {new: true}, (err, blogs) => {
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
