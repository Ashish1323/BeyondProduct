let Product=require("../models/product")
let formidable=require("formidable")
let _ =require("lodash")
let fs=require("fs")
const { parse } = require("path")

exports.getProductById=(req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error:"Unable to find the Product"
            })
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req, (err,fields,file) => {
        if(err){
            return res.status(400).json({
                err:"photo can't update"
            });
        }
        // destructre the fields
        const {name,description,price,category,stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                err:"please fill the inputs"
            })
        }
        
        let product = new Product(fields)
        
        // handle files here
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    err:"file size is big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // save to DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    err:"file save failed"
                })
            }
            return res.json(product)
        })
    });
  
}

exports.getProduct = (req,res) =>{
    req.product.photo= undefined
    return res.json(req.product)
}

// middleware
exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct =(req,res) =>{

    const product=req.product;

    product.remove((err,productRemoved) => {
        if(err || !productRemoved){
            return res.status(400).json({
                error:"Deleting product Failed!!"
            })
        }
        return res.json({
            message:`Product Removed is ${productRemoved.name}`
        });
        
    })

}

exports.updateProduct =(req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req, (err,fields,file) => {
        if(err){
            return res.status(400).json({
                err:"photo can't update"
            });
        }
        // updation code
        let product =req.product
        product=_.extend(product,fields)
        
        // handle files here
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    err:"file size is big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // save to DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    err:"Updation of product failed"
                })
            }
            return res.json(product)
        })
    });
  
}

exports.getAllProduct =(req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sort ? req.query.sort : "_id"
    Product.find()
    .limit(limit)
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error:"Failed to find all products"
            })
        }
        return res.json(products);
    })
}

exports.getAllUniqueCategory =(req,res) =>{
    Product.distinct("category",{},(err,category) =>{
        if(err){
            return res.status(400).json({
                error:"Failed to find all categories"
            })
        }
        return res.json(category);
    })

}
//middle ware update stock and sold
exports.updateStock = (req,res,next) =>{
    let myOperations =req.body.order.products.map(product =>{
        return{
            updateOne:{
                filter:{id:product._id},
                update:{$inc: { stock: -product.count, sold: +product.count }}
            }  
        }
    });

    Product.bulkWrite(myOperations, {}, (err,products)=>{
        if(err){
            res.status(400).json({
                err:"Bulk write failed!!"
            })
        }
        return res.json(products)
    });
    next()
}