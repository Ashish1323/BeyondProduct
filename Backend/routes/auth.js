let express= require("express");
let router=express.Router();
const { body, validationResult } = require('express-validator');
let {auth,signup}=require("../controllers/auth")


router.post("/signup",[
    body('email').isEmail().withMessage('Enter A Email'),
    body('password').isLength({ min: 5 }).withMessage(' Password must be at least 5 chars long'),
    body('name').isLength({ min: 3 }).withMessage(' Name must be at least 3 chars long')
],signup)
router.get("/signout",auth)


module.exports= router;
// Changed//