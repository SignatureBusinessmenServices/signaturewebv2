const express = require('express')
const router = express.Router()

const blog = require('../models/blogs')
const Testimonial = require('../models/testimonials')
const Settings = require('../models/settings')
const Home = require('../models/homepage')
const Services = require('../models/servicepage')
const Sidebar = require('../models/sidebar')
const Setup = require('../models/setuppage')
const Cms = require('../models/cmspage')
const About = require('../models/aboutpage')
const Faq = require('../models/faqspage')

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

        Services.findOne((err,services) => {

          Sidebar.findOne((err,sidebars) => {

    res.render('offices', {layout: 'layouten', sidebars: sidebars,services: services, settings: settings})
  })
})
})
})

router.get('/en/setup', (req, res, next) => {

      Settings.findOne((err,settings) => {

          Setup.findOne((err,setup) => {

            Sidebar.findOne((err,sidebars) => {

    res.render('setup', {layout: 'layouten', setup: setup, settings: settings, sidebars: sidebars})
  })
})
  })
})

router.get('/en/cms', (req, res, next) => {

    Settings.findOne((err,settings) => {

      Cms.findOne((err,cms) => {

        Sidebar.findOne((err,sidebars) => {

    res.render('cms', {layout: 'layouten', cms: cms, sidebars: sidebars, settings: settings})
  })
})
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

      About.findOne((err,about) => {

        Sidebar.findOne((err,sidebars) => {

    res.render('about', {layout: 'layouten', about: about, sidebars: sidebars, settings: settings})
  })
})
})
})

// router.get('/en/testimonials', (req, res, next) => {
//
//     res.render('testimonials', {layout: 'layouten'})
// })

router.get('/en/testimonials', (req, res, next)=>{
    Settings.findOne((err,settings) => {

    Testimonial.find((err, testimonials)=>{

        Sidebar.findOne((err,sidebars) => {

      res.render('testimonials', {testimonials: testimonials, sidebars: sidebars, layout: 'layouten', settings: settings})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
  })
})
})

router.get('/en/faqs', (req, res, next) => {
    Settings.findOne((err,settings) => {

      Faq.findOne((err,faq) => {

        Sidebar.findOne((err,sidebars) => {

    res.render('faqs', {layout: 'layouten', faq: faq, sidebars: sidebars, settings: settings})
  })
})
})
})


// Arabic

router.get('/ar', (req, res, next) => {

      Settings.findOne((err,settings) => {

          Home.findOne((err,home) => {

    res.render('arviews/index', {layout: 'layoutar', home: home, settings: settings})
  })
})
})

router.get('/ar/offices', (req, res, next) => {

      Settings.findOne((err,settings) => {

          Services.findOne((err,services) => {

            Sidebar.findOne((err,sidebars) => {

    res.render('arviews/offices', {layout: 'layoutar', sidebars: sidebars, services: services, settings: settings})
  })
})
  })
})

router.get('/ar/setup', (req, res, next) => {

    Settings.findOne((err,settings) => {

        Setup.findOne((err,setup) => {

          Sidebar.findOne((err,sidebars) => {

    res.render('arviews/setup', {layout: 'layoutar', setup: setup, sidebars: sidebars, settings: settings})
  })
})
})
})

router.get('/ar/cms', (req, res, next) => {

      Settings.findOne((err,settings) => {

        Cms.findOne((err,cms) => {

          Sidebar.findOne((err,sidebars) => {

    res.render('arviews/cms', {layout: 'layoutar', cms: cms, sidebars: sidebars, settings: settings})
  })
})
  })
})

router.get('/ar/blog', (req, res, next) => {

    Settings.findOne((err,settings) => {

    res.render('arviews/blogs', {layout: 'layoutar', settings: settings})
  })
})

router.get('/ar/about', (req, res, next) => {

    Settings.findOne((err,settings) => {

      About.findOne((err,about) => {

        Sidebar.findOne((err,sidebars) => {

    res.render('arviews/about', {layout: 'layoutar', about: about,sidebars: sidebars, settings: settings})
  })
})
  })
})

// router.get('/ar/testimonials', (req, res, next) => {
//
//     res.render('arviews/testimonials', {layout: 'layoutar'})
// })

router.get('/ar/testimonials', (req, res, next)=>{

  Settings.findOne((err,settings) => {

    Testimonial.find((err, testimonials)=>{

      Sidebar.findOne((err,sidebars) => {

      res.render('arviews/testimonials', {testimonials: testimonials, sidebars: sidebars, layout: 'layoutar', settings: settings})
      // res.json({blogs: blogs})
    }).sort({timestamp: -1}).limit(4)
  })
})
})

router.get('/ar/faqs', (req, res, next) => {

    Settings.findOne((err,settings) => {

      Faq.findOne((err,faq) => {

        Sidebar.findOne((err,sidebars) => {

    res.render('arviews/faqs', {layout: 'layoutar', faq: faq, sidebars: sidebars, settings: settings})
  })
})
  })
})




module.exports = router
