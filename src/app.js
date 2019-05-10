var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var morgan = require('morgan')
var app = express()

var db = require('./modules/db')
var logger = require('./modules/logger')
var properties = require('./config/properties.json')
var PORT = process.env.PORT || properties.running_port

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(morgan('dev'))

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


