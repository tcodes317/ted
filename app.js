const express=require("express");
const app=express();
let moviesRouter=require("./Router/moviesRouter");
let globalErrorHandler=require("./../Utils/globalErrorHandler");
let authRouter=require("./Router/authRouter");
let morgan=require(morgan("dev"));

app.use("/api/vi/movies", moviesRouter);
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/vi/userModel", authRouter)

app.use(morgan("dev"));

app.all("*", (req, res, next)=>{

    const msg=`Can't find ${req.originalUrl} in the server`;
    let err=new CustomError(msg, 400);

    return next(err)
})

app.use(globalErrorHandler);

module.exports=app;