const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const Faq = require('../models/faqspage')
const Homepage = require('../models/homepage')
const Sidebar = require('../models/sidebar')


router.get('/editfaqspage', (req, res, next) => {

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

    Faq.findOne((err, faq)=>{

      Sidebar.findOne((err, sidebars)=>{

    res.render('faqspageupdate', {users: users, user: req.user, sidebars: sidebars, faq: faq, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
  })
}
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editfaqspage', (req, res, next) => {

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

      Faq.find((err, cms) => {

          if(err)
            // res.redirect('back')
            next(err)

                const id = {_id: '5ed6482f62aa7bdc3d4a7187'}
                const data = {
                  faqtitle: req.body.faqtitle,
                  faqdescription: req.body.faqdescription,
                  faqs: req.body.faqs,

                  arfaqtitle: req.body.arfaqtitle,
                  arfaqdescription: req.body.arfaqdescription,
                  arfaqs: req.body.arfaqs,

                }



                Faq.findOneAndUpdate(id, data, {new: true}, (err, faq) => {

                    if (err)
                        return next(err)


                const sidebarid = {_id: '5ed4a7076a5b8c3871a5b38c'}


                  Sidebar.findOneAndUpdate(sidebarid, req.body, {new: true}, (err, sidebars) => {

                            if (err)
                                return next(err)

                    res.render('faqspageupdate', {users: users, user: req.user, faq: faq, sidebars: sidebars, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">FAQ Page Updated!</h5>'})
                    // console.log(req.file)
                    // res.json(data)
                })

            })

  })
  })
})
  })




module.exports = router
