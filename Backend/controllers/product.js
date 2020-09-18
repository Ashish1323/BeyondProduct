let Product=require("../models/product")
let formidable=require("formidable")
let _ =require("lodash")
let fs=require("fs")

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
   
        
        //Todo: restrictions on field
        let product = new Product(fields)
        
        // handle files here
        if(file.photo) {
            if(file.photo.size > 5000000) {
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