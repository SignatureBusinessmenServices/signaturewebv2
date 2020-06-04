const mongoose = require('mongoose')

const setuppage = new mongoose.Schema({

    setuptitle: {type: String, default: ''},
    setupdescription: {type: String, default: ''},
    setupsubtitle: {type: String, default: ''},
    setupsubtitledescription: {type: String, default: ''},

    arsetuptitle: {type: String, default: ''},
    arsetupdescription: {type: String, default: ''},
    arsetupsubtitle: {type: String, default: ''},
    arsetupsubtitledescription: {type: String, default: ''},


})

module.exports = mongoose.model('setuppage', setuppage)
