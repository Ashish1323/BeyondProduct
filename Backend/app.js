let mongoose=require("mongoose");
let express=require("express");
let app=express();
const bodyParser=require("body-parser")
let cookieParser=require("cookie-parser")
let cors=require("cors")
require('dotenv').config();

//my routes
var authRoutes=require("./routes/auth")
var userRoutes=require("./routes/user")
var categoryRoutes=require("./routes/category")
var productRoutes=require("./routes/product")
var orderRoutes=require("./routes/order")
var paymentRoutes=require("./routes/stripepayment")

// DB connections
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}).then(() => {
    console.log("DB Connected!!!")
})
.catch((err) => {
    console.log(err);
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentRoutes);


//Port
const port= 9000 || process.env.PORT;


// Running The Server
app.listen(port,function(){

    console.log("App is Running at " + port);
})