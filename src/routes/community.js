module.exports = (router, logger, db, multer, properties, RandomString) =>{

    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'src/static/photo')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(20)+'.'+file.mimetype.split('/')[1])
        }
    })
    const upload = multer({ storage: storage })


    router.post('/like', (req, res)=>{
        var body = req.body
        db.Post.findOne({
            _id : body.posttoken
        }, (err, data)=>{
            if(err) throw err
            else if(data){
                var tmp = data.like
                tmp.push(body.usertoken)
                db.Post.update({_id : body.posttoken}, {$set:{like : tmp}}, (err)=>{
                    if(err) throw err
                    else{
                        res.status(200).send({success:true, message:"좋아요 성공"})
                    }
                })
            }
            else{
                res.status(500).send({success:false, message:"데이터가 없습니다."})
            }
        })
    })


    router.post('/post', upload.single('file'), (req, res)=>{
        var body = req.body
        var file = req.file

        var new_post = new db.Post({
            course_number : body.course_number,
            title : body.title,
            writer : body.usertoken,
            content : body.content,
            photo : properties.static_url+'/photo/'+file.filename,
            like : []
        })

        new_post.save((err)=>{
            if(err) throw err
            else{
                res.status(200).send({success:true, message:"성공적으로 글을 포스팅했습니다."})
            }
        })
    })

    router.get('/post/list', (req, res)=>{
        var query = req.query
        db.Post.find({course_number : query.course_number}, (err, data)=>{
            if(err) throw err
            else{
                res.status(200).send(data)
            }
        })
    })

    router.post('/post/view', (req, res)=>{
        var body = req.body

        db.Post.findOne({posttoken : body.posttoken}).populate('writer').populate('comments').exec((err, data)=>{
            if(err) throw err
            else if(data){
                res.status(200).send(data)
            }
            else{
                res.status(401).send({success:false, message:"데이터가 존재하지 않습니다."})
            }
        })
    })

    router.post('/comment', (req, res)=>{
        var body = req.body

        var new_comment = new db.Comment({
            writer : body.usertoken,
            comment : body.comment,
            posttoken : body.posttoken
        })

        new_comment.save((err)=>{
            if(err) throw err
            else{
                res.status(200).send({success:true, message:"댓글이 성공적으로 등록되었습니다."})
            }
        })
    })

    router.post('/comment/list', (req, res)=>{
        var body = req.body

        db.Comment.find({posttoken : body.posttoken}).populate('writer').exec((err, data)=>{
            if(err) throw err
            else{
                res.status(200).send(data)
            }
        })

    })


    return router

}
