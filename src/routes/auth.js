module.exports = (router, logger, db, RandomString) =>{

    router.post('/register', (req, res)=>{
        var body = req.body

        db.User.findOne({
            email : body.email
        }, (err, data)=>{
            if(err) throw err
            else if(data){
                res.status(409).send({success:false, message:"이미 가입된 이메일 입니다."})
            }
            else{
                var new_user = new db.User({
                    email : body.email,
                    password : body.password,
                    usertoken : RandomString.generate(10)
                })

                new_user.save((err)=>{
                    if(err) throw err
                    else{
                        res.status(200).send(new_user)
                    }
                })
            }
        })
    })


    router.post('/login', (req, res)=>{
        var body = req.body

        db.User.findOne({
            email : body.email,
            password : body.password
        }, (err, data)=>{
            if(err) throw err
            else if(data){
                res.status(200).send(data)
            }
            else{
                res.status(401).send({success:false, message:"가입된 정보가 존재하지 않습니다."})
            }
        })
    })


    return router

}
