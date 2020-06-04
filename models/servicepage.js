const mongoose = require('mongoose')

const servicepage = new mongoose.Schema({

    servicetitle: {type: String, default: ''},
    servicedescription: {type: String, default: ''},
    locationtitle: {type: String, default: ''},
    locationdescription: {type: String, default: ''},
    officetitle: { type: String, default: '' },
    officedescription: { type: String, default: '' },

    arservicetitle: {type: String, default: ''},
    arservicedescription: {type: String, default: ''},
    arlocationtitle: {type: String, default: ''},
    arlocationdescription: {type: String, default: ''},
    arofficetitle: { type: String, default: '' },
    arofficedescription: { type: String, default: '' },

})

module.exports = mongoose.model('servicepage', servicepage)
