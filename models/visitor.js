const mongoose = require('mongoose')

const visitor = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    origin: { type: String, default: 'signature.ae' },
    timestamp: { type: Date, default: Date.now }

})

module.exports = mongoose.model('visitor', visitor)
