const mongoose = require('mongoose')

const UserSign = new mongoose.Schema({
    username: {type:String, default:''},
    email: {type:String, default:'', unique: true},
    password: { type: String, default: ''},
    isAdmin: { type: String, default: 'Yes'},
    isSuperAdmin: { type: String, default: 'No'},
    timestamp: {type:Date, default: Date.now},
    nonce: { type: String, default: null},
    passwordResetTime: { type: Date, default: null}
})

module.exports = mongoose.model('UserSign', UserSign)
