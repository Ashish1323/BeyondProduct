let express= require("express");
let router=express.Router();

const User = require("../models/user")
let {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
let {getUserById,getUser,updatedUser,userPurchaseList}=require("../controllers/user")


router.param("userId",getUserById);



router.get("/user/:userId",isSignedIn,isAuthenticated,getUser )


router.put("/user/:userId",isSignedIn,isAuthenticated,updatedUser )

router.get("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList )


// testing
// router.get("/users",(req,res)=>{
//       User.find((err,user)=>{
//           res.json(user);
//       })
// })

module.exports= router;