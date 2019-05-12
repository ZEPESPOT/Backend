module.exports = (router, logger, db) =>{

    router.post('/sequence/list', (req, res)=>{
        var body = req.body

        db.Course.find({course_number : body.course_number}).populate('sequences').exec((err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.status(200).send(data[0].sequences)
            }
            else{
                res.status(200).send([])
            }
        })
    })

    router.get('/per', (req, res)=>{
        var per = 100
        db.Sequence.find({}, (err, data)=>{
            if(err) throw err
            else if(data[0]){
                for (var i=0;i<data.length;i++){
                    if(data[i].cleared == false){
                        per = per - 20
                    }
                }
                res.status(200).send({percent : per})
            }
            else{
                res.status(200).send({percent : 0})
            }
        })
    })



    router.post('/c_add', (req, res)=>{
        var body = req.body
        var new_c = new db.Course({
            course_number: body.course_number,
            course_name : body.course_name,
            count : 0
        })
        new_c.save((err)=>{
            if(err) throw err
            else{
                res.send(200, "Asdfasdfasdfasdf")
            }
        })
    })

    router.post('/s_add', (req, res)=>{
        var body = req.body
        var new_s = new db.Sequence({
            sequence_name : body.sequence_name,
            sequence_number : body.sequence_number,
            latitude : body.latitude,
            longitude : body.longitude,
            photo : body.photo
        })

        new_s.save((err)=>{
            if(err) throw err
            else{
                db.Sequence.findOne({
                    sequence_name: body.sequence_name
                },(err, data)=>{
                    if(err) throw err
                    else if(data){
                        db.Course.find({
                            course_number:1
                        },(err, dataa)=>{
                            if(err) throw err
                            else {
                                console.log(dataa[0])
                                dataa[0].sequences.push(data._id)
                                db.Course.update({course_number:1}, {$set:{sequences: dataa[0].sequences}}, (err)=>{
                                    if(err) throw err
                                    else{
                                        res.send(200, "Asdfasdfasdfasdf")
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })

    return router
}
