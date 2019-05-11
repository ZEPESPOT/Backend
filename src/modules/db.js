var mongoose = require('mongoose');
var logger = require('../modules/logger')
var properties = require('../config/properties')

var db = mongoose.connect('mongodb://'+properties.dbconfig.db_host+'/'+properties.dbconfig.db_name, { useNewUrlParser: true }, (err)=>{
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
    username : {type : String},
    email : {type : String},
    password : {type : String},
    profile_img : {type : String},
    zepeto_code : {type : String}
})

const User = mongoose.model('user', UserSchema, 'users')


const CommentSchema = new mongoose.Schema({
    writer : {type : mongoose.Schema.Types.ObjectId, ref : User},
    time : {type : Date, default: Date.now()},
    comment : {type : String},
    posttoken : {type : String}
})

const Comment = mongoose.model('comment', CommentSchema)


const PostSchema = new mongoose.Schema({
    writer : {type : mongoose.Schema.Types.ObjectId, ref : User},
    time : {type : Date, default: Date.now()},
    course_number : {type : Number},
    title : {type : String},
    content : {type : String},
    photo : {type : String},
    like : {type : Array}
})

const Post = mongoose.model('post', PostSchema)


const SequenceSchema = new mongoose.Schema({
    sequence_number : {type : Number},
    sequence_name : {type : String},
    latitude : {type : Number},
    longitude : {type : Number},
    photo : {type : String},
    cleared : {type : Boolean}
})

const Sequence = mongoose.model('sequence', SequenceSchema)


const CourseSchema = new mongoose.Schema({
    course_number : {type : Number},
    course_name : {type : String},
    sequences : [{type : mongoose.Schema.Types.ObjectId, ref : Sequence}],
    count : {type : Number},
})

const Course = mongoose.model('course', CourseSchema)


const GallerySchema = new mongoose.Schema({
    place_name : {type : String},
    photo : {type : String},
    usertoken : {type : String}
})

const Gallery = mongoose.model('gallery', GallerySchema)



exports.User = User
exports.Post = Post
exports.Comment = Comment
exports.Course = Course
exports.Sequence = Sequence
exports.Gallery = Gallery
exports.db = db


