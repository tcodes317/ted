const CustomError=require("./../Utils/CustomError")

let devError=(res, error)=>{
res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error
})
}
let castErrorHandler=(err)=>{
let msg=`Invalid value ${err.path}: ${err.value}`;

return new CustomError(msg, 400);
}
let duplicateKeyErrorHandler=(err)=>{
    let name=value.keyValue.name;
    let msg=`There is an existing movie name ${name}. Please, enter another name`;

    return new CustomError(msg, 400);
}
let validationErrorHandler= (err)=>{
    let error=Object.values(err.error).map(val => val.message);
    let errorMessage=error.join(". ");

    let msg=`Invalid input data ${errorMessage}`;

    return new CustomError(msg, 400);
}
let prodError=(res, error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.status,
            message: err.message
        })
    }
    else{
        res.status(500).json({
            status: error.status,
            message: err.message
        })
    }
}
module.exports=(error, req, res, next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if(processe.env.NODE_ENV === "development"){
        devError(res, error);
    }
    else if(process.env.NODE_ENV === "production"){
        if(error.name === "castError") error = castErrorHandler(error);
        if(error.code === 11000) error = duplicateKeyErrorHandler(error);
        if(error.name === "validationErrorHandler") error = validationErrorHandler(error)

        prodError(res, error)
    }
}