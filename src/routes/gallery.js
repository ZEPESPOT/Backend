module.exports = (router, logger, db, multer, properties, RandomString) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'src/static/photo')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(20)+'.'+file.mimetype.split('/')[1])
        }
    })
    const upload = multer({ storage: storage })

    router.post('/upload', upload.single('file'), (req, res)=>{
        var body = req.body
        var file = req.file

        var new_gl = new db.Gallery({
            place_name : body.place_name,
            photo : properties.static_url+'/photo/'+file.filename,
            usertoken : body.usertoken
        })

        new_gl.save((err)=>{
            if(err) throw err
            else{
                res.status(200).send({success:true, message:"성공적으로 갤러리에 업로드 하였습니다."})
            }
        })

    })

    router.post('/list', (req, res)=>{
        var body = req.body

        db.Gallery.find({
            usertoken : body.usertoken
        }, (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.status(200).send(data)
            }
            else{
                res.status(200).send([])
            }
        })
    })

    return router

}
