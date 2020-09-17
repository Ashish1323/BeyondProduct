let express= require("express");
let router=express.Router();

let {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
let {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}=require("../controllers/category")
let {getUserById}=require("../controllers/user")

// PARAMS
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);


// ROUTES
//create category
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
//get category and categories
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

//update category
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
//delete category   
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)



module.exports= router;
