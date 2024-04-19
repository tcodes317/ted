

const devError=(res, error)=>{
res.status(error.statusCode)
}
const castErrorHandler=(err)=>{

}
const duplicateKeyErrorHandler=(err)=>{

}
const validationErrorHandler= (err)=>{

}
const prodError=(res, error)=>{

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