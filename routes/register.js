const express = require('express')
const router = express.Router()
const passport = require ('passport')


router.post('/register', passport.authenticate('localRegister', {
    successRedirect: '/users'
}))

module.exports = router
