require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')

// Messages
const flash = require('connect-flash');

// Upload Images
const multer = require('multer')
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')

// Editable HTML Content
const save = require('summernote-nodejs');

const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')

const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

// Passport
const passport = require('passport')
const session = require('express-session')
const auth = require('./config/auth')(passport)

const index = require('./routes/index')
const contactSubmit = require('./routes/contactsubmit')
const blogs = require('./routes/blogs')
const admin = require('./routes/admin')
const register = require('./routes/register')
const adminpage = require('./routes/adminpage')
const users = require('./routes/users')
const testimonials = require('./routes/testimonials')
const settings = require('./routes/settings')



mongoose.connect('mongodb+srv://jerome:mongodbuser1234@emails-nkbzd.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err, data) => {
    if (err) {
        console.log('DB Connection Failed')
        return
    }

    console.log('DB Connection Success')
    })

const app = express();


// Login / Session
app.use(flash());

app.use(session({
    secret: 'awehfuilawef',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

let sitemap

app.get('/sitemap.xml', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://signature.ae/' })
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    smStream.write({ url: '/',  changefreq: 'weekly', priority: 0.3 })
    smStream.write({ url: '/en',  changefreq: 'monthly',  priority: 0.9 })
    smStream.write({ url: '/en/about',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/en/blogs',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/en/cms',  changefreq: 'monthly',  priority: 0.8 })
    smStream.write({ url: '/en/faqs',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/en/offices',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/en/setup',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/en/testimonials',  changefreq: 'monthly',  priority: 0.3 })

    smStream.write({ url: '/',  changefreq: 'weekly', priority: 0.3 })
    smStream.write({ url: '/ar',  changefreq: 'monthly',  priority: 0.9 })
    smStream.write({ url: '/ar/about',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/ar/cms',  changefreq: 'monthly',  priority: 0.8 })
    smStream.write({ url: '/ar/faqs',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/ar/offices',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/ar/setup',  changefreq: 'monthly',  priority: 0.3 })
    smStream.write({ url: '/ar/testimonials',  changefreq: 'monthly',  priority: 0.3 })

    smStream.end()

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

const http = require('http');
const https = require("https"),
  fs = require("fs");

  const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/www.signature.ae/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/www.signature.ae/fullchain.pem"),
  };


app.use('/en',express.static(path.join(__dirname, 'public')))
app.use('/en/bloglist',express.static(path.join(__dirname, 'public')))
app.use('/bloglistedit',express.static(path.join(__dirname, 'public')))
app.use('/blogupdate',express.static(path.join(__dirname, 'public')))
app.use('/add',express.static(path.join(__dirname, 'public')))
app.use('/ar',express.static(path.join(__dirname, 'public')))
app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/edituser',express.static(path.join(__dirname, 'public')))
app.use('/testimonialupdate',express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)

app.use((req, res, next) => {
    req.timestamp = new Date().toString()
    next()
});


app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'views/arviews'),path.join(__dirname, 'views/adminviews')])
app.set('view engine', 'ejs')
app.set('layout', 'layouten','layoutar','layoutadmin')


app.use('/', index)
app.use('/', contactSubmit)
app.use('/', blogs)
app.use('/', admin)
app.use('/', register)
app.use('/', adminpage)
app.use('/', users)
app.use('/', testimonials)
app.use('/', settings)



// Redirect from http port 80 to https


http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);



// app.listen(8000, '192.168.1.217')


https.createServer(options, app).listen(443);

console.log('Server Running...')
