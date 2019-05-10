module.exports = (router, logger) =>{

    router.get('/test', (req, res)=>{
        res.send("Server Testing...")
        logger.info("SERVER TEST", req)
        logger.warning("SERVER TEST", req)
        logger.fatal("SERVER TEST")
    })

    return router

}
