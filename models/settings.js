const mongoose = require('mongoose')

const settings = new mongoose.Schema({
    companyname: {type: String, default: ''},
    email: {type: String, default: ''},
    phone: {type: String, default: ''},
    googlemap: {type: String, default: ''},
    facebook: {type: String, default: ''},
    twitter: {type: String, default: ''},
    youtube: {type: String, default: ''},

    building: { type: String, default: '' },
    floor: { type: String, default: '' },
    street: { type: String, default: '' },

    arbuilding: { type: String, default: '' },
    arfloor: { type: String, default: '' },
    arstreet: { type: String, default: '' },

    topbar: { type: String, default: '' },
    artopbar: { type: String, default: '' },
    topbaractive: { type: String, default: '' },

})

module.exports = mongoose.model('settings', settings)
