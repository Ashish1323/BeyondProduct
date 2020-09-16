var User= require("../models/user");

var Order = require("../models/order");

exports.getUserById=(req,res,next,id) => {
    User.findById(id,(err,user)=>{
        if(err || ! user){
            return res.status(403).json({
                error:"Unable to find user"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser=(req,res)=>{
    //todo: get back here to password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;

    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
   return res.json(req.profile)
}

exports.updatedUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindandModify:false},
        (err,user)=>{
            if(err){
                res.status(400).json({
                    error:"User not updated"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
        
            user.createdAt = undefined;
            user.updatedAt = undefined;
        

            res.json(user);
        }

    )
    

}

exports.userPurchaseList=(req,res)=>{
  
    Order.find({_id:req.profile._id}).populate("user","name _id").exec((err,order)=>{
        if(err || !order){
            req.status(400).json({
                error:"No Orders"
            })
        }
        res.json(order);
    })
}
