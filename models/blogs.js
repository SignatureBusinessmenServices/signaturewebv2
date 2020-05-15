const mongoose = require('mongoose')

const blogBasePath = 'uploads/blogimages'

const blog = new mongoose.Schema({
    title: { type: String, default: '' },
    date: { type: String, default: '' },
    headline: { type: String, default: '' },
    details: { type: String, default: '' },
    blogImage: {type: String, default: ''},
    timestamp: { type: Date, default: Date.now },
    collapseId: {type: String, default: ''},
    collapseHref: {type: String, default: ''},
})



module.exports = mongoose.model('blog', blog)
module.exports.blogBasePath = blogBasePath
