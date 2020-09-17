const User = require("../models/user")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup=(req,res) => {

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            "err":errors.array()[0].msg,
            "error place":errors.array()[0].param
        })
    }


    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                message:err
            })
        }
        else{
            res.json(user)
        }

    })
}

exports.signin=(req,res) => {
    const {email,password} = req.body
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            "err":errors.array()[0].msg,
            "error place":errors.array()[0].param
        })
    }

    User.findOne({email:email} ,(err,user) => {
        if(err || !user) {
            return res.status(400).json({
                err: "Email doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                err: "Password doesn't match to the email"
            })
        }
        //create token 
        const token= jwt.sign({_id:user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //send response to front end
        const {_id,name,email,role} = user
        return res.json({token, user:{ _id,name,email,role }});
   });
}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.send("User is signed out")
}

// protected route
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})

//custom middleware
exports.isAuthenticated=(req,res,next) => {
    let checker= req.profile && req.auth && req.profile._id == req.auth._id
    console.log(req.profile)
    console.log(req.auth)
    console.log(req.profile._id)
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin=(req,res,next) => {
    if(role===0){
        return res.status(403).json({
            error:"you are not admin, ACCESS DENIED"
        })
    }
    next()
}