module.exports=(req, res)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    res.status(error.statusCode).json({
        status: error.status,
        
    })
}