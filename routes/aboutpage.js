const express = require('express')
const router = express.Router()

const passport = require ('passport')

const User = require('../models/User')
const About = require('../models/aboutpage')
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
}).fields([{name: 'aboutimage'}, {name: 'teamimage1'}, {name: 'teamimage2'}]);

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

router.get('/editaboutpage', (req, res, next) => {

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

    About.findOne((err, about)=>{

      Sidebar.findOne((err, sidebars)=>{

    res.render('aboutpageupdate', {users: users, user: req.user, sidebars: sidebars, about: about, layout: 'layoutadmin'})
    // res.json({settings: settings})
  })
})
  })
}
})


// POST REQUEST OF EDIT BLOG WITH OR WITHOUT NEW IMAGE
router.post('/editaboutpage', (req, res, next) => {

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

      About.find((err, about) => {

        upload(req, res, (err) => {

          if(err)
            // res.redirect('back')
            next(err)

                const id = {_id: '5ed628d1216c70f6bd000303'}
                const data = {
                  abouttitle: req.body.abouttitle,
                  aboutdescription: req.body.aboutdescription,
                  aboutsubtitle: req.body.aboutsubtitle,
                  aboutsubtitledesctiption: req.body.aboutsubtitledesctiption,
                  aboutteamtitle: req.body.aboutteamtitle,
                  aboutteamdescription: req.body.aboutteamdescription,
                  team1name: req.body.team1name,
                  team1title: req.body.team1title,
                  team2name: req.body.team2name,
                  team2title: req.body.team2title,


                  arabouttitle: req.body.arabouttitle,
                  araboutdescription: req.body.araboutdescription,
                  araboutsubtitle: req.body.araboutsubtitle,
                  araboutsubtitledescription: req.body.araboutsubtitledescription,
                  araboutteamtitle: req.body.araboutteamtitle,
                  araboutteamdescription: req.body.araboutteamdescription,
                  arteam1name: req.body.arteam1name,
                  arteam1title: req.body.arteam1title,
                  arteam2name: req.body.arteam2name,
                  arteam2title: req.body.arteam2title,

                }


                About.findOneAndUpdate(id, data, {new: true}, (err, about) => {

                    if (err)
                        return next(err)


                const sidebarid = {_id: '5ed4a7076a5b8c3871a5b38c'}


                  Sidebar.findOneAndUpdate(sidebarid, req.body, {new: true}, (err, sidebars) => {

                            if (err)
                                return next(err)

                    res.render('aboutpageupdate', {users: users, user: req.user, about: about, sidebars: sidebars, layout: 'layoutadmin', msg: '<h5 class="text-left btn-success rounded py-2 pl-4 my-2 mr-1">About Us Page Updated!</h5>'})
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
