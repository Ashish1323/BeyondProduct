exports.createCategory= (req,res) => {
    const category =new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to add category"
            })
        }
        res.json(category)
    })
}

exports.getCategory= (req,res) =>{
    return res.json(req.category)
}

exports.getAllCategory =(req,res) =>{
    Category.find().exec((err,categories) => {
        if(err){
            return res.status(400).json({
                error:"Failed to find all categories"
            })
        }
        return res.json(categories);
    })
}

exports.updateCategory = (req,res) =>{
    let category=req.category;
    category.name=req.body.name;

    category.save((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error:"Failed To Update!!"
            })
        }
        return res.json(updatedCategory);
    })
}

exports.deleteCategory =(req,res) =>{

        
        // Category.findByIdAndRemove(req.category._id, (err,categoryRemoved) => {
        //     if(err || !categoryRemoved){
        //         return res.status(400).json({
        //             error:"Deleting Category Failed!!"
        //         })
        //     }
        //     return res.json({
        //         message:`Category Removed is ${categoryRemoved}`
        //     });
        // })

        const category=req.category;

        category.remove((err,categoryRemoved) => {
            if(err || !categoryRemoved){
                return res.status(400).json({
                    error:"Deleting Category Failed!!"
                })
            }
            return res.json({
                message:`Category Removed is ${categoryRemoved.name}`
            });
            
        })
  
   
}