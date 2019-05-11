var mongoose = require('mongoose');
var logger = require('../modules/logger')

var db = mongoose.connect('mongodb://localhost/zepespot', { useNewUrlParser: true }, (err)=>{
    if(err){
        logger.fatal("DB Error!")
        throw err
    }
    else {
        logger.info('DB Connect Success!')
    }
});

mongoose.Promise = global.Promise;


const UserSchema = new mongoose.Schema({
    email : {type : String},
    password : {type : String},
    usertoken : {type : String},
})



const User = mongoose.model('user', UserSchema)

exports.User = User
exports.db = db


