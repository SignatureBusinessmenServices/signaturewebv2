
const LocalStrategy = require('passport-local').Strategy
const UserSign = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {
    passport.serializeUser((user, next) => {
        next(null, user)
    })

    passport.deserializeUser((id, next) => {
        UserSign.findById(id, (err, user) => {
            next(err, user)
        })
    })

    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, next) => {
        UserSign.findOne({ email: email }, (err, user) => {
            if (err) {
                return next(err)
            }

            // user not found:
            if (user == null)
                  return next(null, false, req.flash( 'message', 'User Not Found' ));
                // return next()


            // check password:
            if (bcrypt.compareSync(password, user.password) == false)
                // return next()
                return next(null, false, req.flash( 'message', 'Invalid Password' ));

            if (user.isAdmin == 'No')
              return next(null, false, req.flash( 'message', 'You do not have access!' ));

            return next(null, user)
        })
    })

    passport.use('localLogin', localLogin)

    const localRegister = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

    }, (req, email, password, next) => {
        UserSign.findOne({ email: email }, (err, user) => {
            if (err) {
                return next(err)
            }

            if (user != null)
                return next(null, false, req.flash( 'message', 'User already exist, please log in.'))

            //create new user
            const hashedPw = bcrypt.hashSync(password, 10)


            UserSign.create({ email: email, password: hashedPw}, (err, user) => {
                if (err)
                    return next(err)

                next(null, user)
            })

        })

    })
    passport.use('localRegister', localRegister)
}
