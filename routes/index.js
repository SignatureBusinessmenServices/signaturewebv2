const express = require('express')
const router = express.Router()

const blog = require('../models/blogs')
const Testimonial = require('../models/testimonials')
const Settings = require('../models/settings')
const Home = require('../models/homepage')

router.get('/', (req, res, next) => {

    res.redirect('/en')
})

router.get('/en', (req, res, next) => {

    Settings.findOne((err,settings) => {

          Home.findOne((err,home) => {

      res.render('index', {layout: 'layouten', settings: settings, home: home})
    })
  })
})

router.get('/en/offices', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('offices', {layout: 'layouten', settings: settings})
  })
})

router.get('/en/setup', (req, res, next) => {

      Settings.findOne((err,settings) => {

    res.render('setup', {layout: 'layouten', settings: settings})
  })
})

router.get('/en/cms', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('cms', {layout: 'layouten', settings: settings})
  })
})

router.get('/en/bloglist', (req, res, next) => {

  Settings.findOne((err,settings) => {

  blog.find((err, blogs)=>{

    res.render('bloglist', {blogs: blogs, layout: 'layouten', settings: settings})
    // res.json({blogs: blogs})
  }).sort({timestamp: -1})
})
})

router.get('/en/bloglist/:_id', (req, res, next) => {
  const id = req.params
  Settings.findOne((err,settings) => {

  blog.find(id, (err, blogs)=>{

    res.render('blogitem', {blogs: blogs, layout: 'layouten', settings: settings})
    // res.json({blogs: blogs})
  })
})
})

router.get('/en/blog', (req, res, next)=>{
    Settings.findOne((err,settings) => {

    blog.find((err, blogs)=>{

      res.render('blogs', {blogs: blogs, layout: 'layouten', settings: settings})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(3)
  })
})

router.get('/en/about', (req, res, next) => {
    Settings.findOne((err,settings) => {

    res.render('about', {layout: 'layouten', settings: settings})
  })
})

// router.get('/en/testimonials', (req, res, next) => {
//
//     res.render('testimonials', {layout: 'layouten'})
// })

router.get('/en/testimonials', (req, res, next)=>{
    Settings.findOne((err,settings) => {

    Testimonial.find((err, testimonials)=>{

      res.render('testimonials', {testimonials: testimonials, layout: 'layouten', settings: settings})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
  })
})

router.get('/en/faqs', (req, res, next) => {
    Settings.findOne((err,settings) => {

    res.render('faqs', {layout: 'layouten', settings: settings})
  })
})


// Arabic

router.get('/ar', (req, res, next) => {

      Settings.findOne((err,settings) => {

    res.render('arviews/index', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/offices', (req, res, next) => {

      Settings.findOne((err,settings) => {

    res.render('arviews/offices', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/setup', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('arviews/setup', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/cms', (req, res, next) => {

      Settings.findOne((err,settings) => {

    res.render('arviews/cms', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/blog', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('arviews/blogs', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/about', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('arviews/about', {layout: 'layoutar', settings: settings})
  })
})

// router.get('/ar/testimonials', (req, res, next) => {
//
//     res.render('arviews/testimonials', {layout: 'layoutar'})
// })

router.get('/ar/testimonials', (req, res, next)=>{

  Settings.findOne((err,settings) => {

    Testimonial.find((err, testimonials)=>{

      res.render('arviews/testimonials', {testimonials: testimonials, layout: 'layoutar', settings: settings})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
  })
})

router.get('/ar/faqs', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('arviews/faqs', {layout: 'layoutar', settings: settings})
  })
})




module.exports = router
