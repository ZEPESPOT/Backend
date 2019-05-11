module.exports = (app, logger, passport, FacebookStrategy, properties) => {

    passport.serializeUser((user, done)=>{
        console.log("serialize")
        console.log(user)
        done(null, user);
    });

    passport.deserializeUser((user, done)=>{
        console.log("deserialize")
        console.log(user)
        done(null, user);
    });

    passport.use(new FacebookStrategy({
        clientID : properties.facebook.key,
        clientSecret : properties.facebook.secret,
    }, (accessToken, refreshToken, profile, done)=>{
        console.log('======== FACEBOOK PROFILE ========')
        console.log(profile)
        done(null, profile)
    }));

    app.get('/facebook/test', passport.authenticate('facebook-token'), (req, res)=>{
        console.log("USER_TOKEN ==== " + req.param('access_token'));
        if(req.user){
            console.log(req.user)
            res.status(200).send(req.user)
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });

}
