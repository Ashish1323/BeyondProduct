let express=require("express");

let app=express();

app.get("/",(req,res) => {
    res.send("Home Page")

})

const islog= (req,res,next) => {
    console.log("loda");
    next();
}

function isadmin(req,res,next){
    console.log("hola");
    next();
}

app.get("/admin",islog,isadmin,(req,res) =>{
    res.send("Yay You are admin!!")
})

app.listen(4000);