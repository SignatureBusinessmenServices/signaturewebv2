const mongoose = require('mongoose')

const testimonials = new mongoose.Schema({
    company: { type: String, default: '' },
    testimonial: { type: String, default: '' },
    person: { type: String, default: '' },
    testimonialImage: {type: String, default: ''},
    timestamp: { type: Date, default: Date.now },
    arcompany: { type: String, default: '' },
    artestimonial: { type: String, default: '' },
    arperson: { type: String, default: '' },

})

module.exports = mongoose.model('testimonials', testimonials)
