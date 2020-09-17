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

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases=[]

    req.body.order.products.forEach(function(purchase){
        purchases.push({
            _id:purchase._id,
            name:purchase.name,
            description:purchase.description,
            category:purchase.category,
            quantity:purchase.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id,
        })
    })

    

    User.findOneAndUpdate(
                          {
                            _id:req.profile._id
                          },
                          {
                            $push:{purchases:purchases}
                          },
                          {
                              new:True
                          }
                          
        ,function(err,user){
        if(err){
            return res.status(400).json({
                err:"Not able to update the purchase list!!"
            })
        }
        next();
    })
}
