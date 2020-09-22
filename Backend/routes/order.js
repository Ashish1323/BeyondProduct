let express= require("express");
let router=express.Router();

let { isSignedIn,isAuthenticated,isAdmin }=require("../controllers/auth")
let { getUserById,pushOrderInPurchaseList }=require("../controllers/user")

let {updateStock}=require("../controllers/product")
let { getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus }=require("../controllers/order")


//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//actual routes
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
router.get("/order/allorders/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//order status routes
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)


module.exports= router;