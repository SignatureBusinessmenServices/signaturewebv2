const mongoose = require('mongoose')

const sidebar = new mongoose.Schema({

    contact: {type: String, default: ''},
    setup: {type: String, default: ''},
    service: {type: String, default: ''},


    arcontact: {type: String, default: ''},
    arsetup: {type: String, default: ''},
    arservice: {type: String, default: ''},



})

module.exports = mongoose.model('sidebar', sidebar)
