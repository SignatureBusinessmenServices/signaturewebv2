const express = require('express')
const router = express.Router()

const blog = require('../models/blogs')
const Testimonial = require('../models/testimonials')
const Settings = require('../models/settings')

router.get('/', (req, res, next) => {

    res.redirect('/en')
})

router.get('/en', (req, res, next) => {

    Settings.findOne((err,settings) => {
      res.render('index', {layout: 'layouten', settings: settings})
    })
})

router.get('/en/offices', (req, res, next) => {

    res.render('offices', {layout: 'layouten'})
})

router.get('/en/setup', (req, res, next) => {

    res.render('setup', {layout: 'layouten'})
})

router.get('/en/cms', (req, res, next) => {

    res.render('cms', {layout: 'layouten'})
})

router.get('/en/bloglist', (req, res, next) => {
  blog.find((err, blogs)=>{

    res.render('bloglist', {blogs: blogs, layout: 'layouten'})
    // res.json({blogs: blogs})
  }).sort({timestamp: -1})
})

router.get('/en/bloglist/:_id', (req, res, next) => {
  const id = req.params

  blog.find(id, (err, blogs)=>{

    res.render('blogitem', {blogs: blogs, layout: 'layouten'})
    // res.json({blogs: blogs})
  })
})

router.get('/en/blog', (req, res, next)=>{
    blog.find((err, blogs)=>{

      res.render('blogs', {blogs: blogs, layout: 'layouten'})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(3)
})

router.get('/en/about', (req, res, next) => {

    res.render('about', {layout: 'layouten'})
})

// router.get('/en/testimonials', (req, res, next) => {
//
//     res.render('testimonials', {layout: 'layouten'})
// })

router.get('/en/testimonials', (req, res, next)=>{
    Testimonial.find((err, testimonials)=>{

      res.render('testimonials', {testimonials: testimonials, layout: 'layouten'})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
})

router.get('/en/faqs', (req, res, next) => {

    res.render('faqs', {layout: 'layouten'})
})






// Arabic

router.get('/ar', (req, res, next) => {

    res.render('arviews/index', {layout: 'layoutar'})
})

router.get('/ar/offices', (req, res, next) => {

    res.render('arviews/offices', {layout: 'layoutar'})
})

router.get('/ar/setup', (req, res, next) => {

    res.render('arviews/setup', {layout: 'layoutar'})
})

router.get('/ar/cms', (req, res, next) => {

    res.render('arviews/cms', {layout: 'layoutar'})
})

router.get('/ar/blog', (req, res, next) => {

    res.render('arviews/blogs', {layout: 'layoutar'})
})

router.get('/ar/about', (req, res, next) => {

    res.render('arviews/about', {layout: 'layoutar'})
})

// router.get('/ar/testimonials', (req, res, next) => {
//
//     res.render('arviews/testimonials', {layout: 'layoutar'})
// })

router.get('/ar/testimonials', (req, res, next)=>{
    Testimonial.find((err, testimonials)=>{

      res.render('arviews/testimonials', {testimonials: testimonials, layout: 'layoutar'})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
})

router.get('/ar/faqs', (req, res, next) => {

    res.render('arviews/faqs', {layout: 'layoutar'})
})




module.exports = router
