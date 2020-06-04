const mongoose = require('mongoose')

const faqspage = new mongoose.Schema({

    faqtitle: {type: String, default: ''},
    faqdescription: {type: String, default: ''},
    faqs: {type: String, default: ''},

    arfaqtitle: {type: String, default: ''},
    arfaqdescription: {type: String, default: ''},
    arfaqs: {type: String, default: ''},

})

module.exports = mongoose.model('faqspage', faqspage)
