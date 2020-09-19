let express= require("express");
let router=express.Router();
let { getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProduct,getAllUniqueCategory }=require("../controllers/product")
let { isSignedIn,isAuthenticated,isAdmin }=require("../controllers/auth")
let { getUserById }=require("../controllers/user")

// router of params
router.param("productId",getProductById);
router.param("userId",getUserById);

// actual routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

// create product routes
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

// delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
// update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
//listing routes
router.get("/products",getAllProduct)
router.get("/products/categories",getAllUniqueCategory)
module.exports= router;