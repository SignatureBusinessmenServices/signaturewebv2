const mongoose = require('mongoose')

const cmspage = new mongoose.Schema({

    cmstitle: {type: String, default: ''},
    cmsdescription: {type: String, default: ''},
    cmssubtitle: {type: String, default: ''},
    cmssubtitledescription: {type: String, default: ''},
    offers: { type: String, default: '' },

    arcmstitle: {type: String, default: ''},
    arcmsdescription: {type: String, default: ''},
    arcmssubtitle: {type: String, default: ''},
    arcmssubtitledescription: {type: String, default: ''},
    aroffers: { type: String, default: '' },

})

module.exports = mongoose.model('cmspage', cmspage)
