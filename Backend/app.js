let mongoose=require("mongoose");
let express=require("express");
let app=express();
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}).then(() => {
    console.log("DB Connected!!!")
})
.catch((err) => {
    console.log(err);
})

const port=9000;

app.listen(port,function(){

    console.log(`App is Running at ${port}`)
})