const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const Cms = require('../models/cmspage')
const Homepage = require('../models/homepage')
const Sidebar = require('../models/sidebar')


router.get('/editcmspage', (req, res, next) => {

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

    Cms.findOne((err, cms)=>{

      Sidebar.findOne((err, sidebars)=>{

    res.render('cmspageupdate', {users: users, user: req.user, sidebars: sidebars, cms: cms, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
  })
}
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editcmspage', (req, res, next) => {

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

      Cms.find((err, cms) => {

          if(err)
            // res.redirect('back')
            next(err)

                const id = {_id: '5ed5e1cc208cfe1143922f67'}
                const data = {
                  cmstitle: req.body.cmstitle,
                  cmsdescription: req.body.cmsdescription,
                  cmssubtitle: req.body.cmssubtitle,
                  cmssubtitledescription: req.body.cmssubtitledescription,
                  offers: req.body.offers,

                  arcmstitle: req.body.arcmstitle,
                  arcmsdescription: req.body.arcmsdescription,
                  arcmssubtitle: req.body.arcmssubtitle,
                  arcmssubtitledescription: req.body.arcmssubtitledescription,
                  aroffers: req.body.aroffers,

                }



                Cms.findOneAndUpdate(id, data, {new: true}, (err, cms) => {

                    if (err)
                        return next(err)


                const sidebarid = {_id: '5ed4a7076a5b8c3871a5b38c'}


                  Sidebar.findOneAndUpdate(sidebarid, req.body, {new: true}, (err, sidebars) => {

                            if (err)
                                return next(err)

                    res.render('cmspageupdate', {users: users, user: req.user, cms: cms, sidebars: sidebars, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">CMS Page Updated!</h5>'})
                    // console.log(req.file)
                    // res.json(data)
                })

            })

  })
  })
})
  })




module.exports = router
