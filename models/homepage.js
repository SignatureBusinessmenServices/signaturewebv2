const mongoose = require('mongoose')

const homepage = new mongoose.Schema({
    // imageOne: {type: String, default: ''},
    // imageTwo: {type: String, default: ''},
    // imageThree: {type: String, default: ''},
    overlaytitle: {type: String, default: ''},
    overlaysubtitle: {type: String, default: ''},
    aroverlaytitle: {type: String, default: ''},
    aroverlaysubtitle: {type: String, default: ''},

    // imageServiced: { type: String, default: '' },
    // imageSetup: { type: String, default: '' },
    // imageCMS: { type: String, default: '' },

    servicetitle: { type: String, default: '' },
    servicesubtitle: { type: String, default: '' },
    arservicetitle: { type: String, default: '' },
    arservicesubtitle: { type: String, default: '' },

    setuptitle: { type: String, default: '' },
    setupsubtitle: { type: String, default: '' },
    arsetuptitle: { type: String, default: '' },
    arsetupsubtitle: { type: String, default: '' },

    cmstitle: { type: String, default: '' },
    cmssubtitle: { type: String, default: '' },
    arcmstitle: { type: String, default: '' },
    arcmssubtitle: { type: String, default: '' },
})

module.exports = mongoose.model('homepage', homepage)
