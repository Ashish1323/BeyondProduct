let express= require("express");
let router=express.Router();
let { getProductById,createProduct }=require("../controllers/product")
let { isSignedIn,isAuthenticated,isAdmin }=require("../controllers/auth")
let { getUserById }=require("../controllers/user")

// router of params
router.param("productId",getProductById);
router.param("userId",getUserById);

// actual routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

module.exports= router;