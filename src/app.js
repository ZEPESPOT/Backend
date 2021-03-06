var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var morgan = require('morgan')
var passport = require('passport')
var RandomString = require('randomstring')
var multer = require('multer')
var AppFacebookStrategy = require('passport-facebook-token')
var app = express()

var db = require('./modules/db')
var logger = require('./modules/logger')
var properties = require('./config/properties.json')
var PORT = process.env.PORT || properties.running_port


app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(morgan('dev'))

app.use(passport.initialize());
app.use(passport.session());

app.use('/photo', express.static('src/static/photo'))

app.use(session({
    secret:'!!@#!@%!@^!@#$!@#%!@#^!!&%#*&@#!#SESSION!@#$!@#%!@#%!@#%SECRET!@$!@$!%!@#%',
    resave: false,
    saveUninitialized:true
}));

app.use('/css', express.static('src/templates/css'))

app.set('view engine', 'html')
app.set('views', 'src/templates/html')
app.engine('html', require('ejs').renderFile);

app.listen(PORT, (err)=>{
    if(err){
        console.log('Server Error')
    }
    else {
        logger.checkLogDir()
        logger.info('Server Running At '+PORT+' Port!')
    }
})

app.use('/', require('./routes/index')(express.Router(), logger))
app.use('/auth', require('./routes/auth')(express.Router(), logger, db, RandomString))
app.use('/community', require('./routes/community')(express.Router(), logger, db, multer, properties, RandomString))
app.use('/course', require('./routes/course')(express.Router(), logger, db))
app.use('/gallery', require('./routes/gallery')(express.Router(), logger, db, multer, properties, RandomString))

require('./modules/passport')(app, logger, passport, AppFacebookStrategy, properties)

