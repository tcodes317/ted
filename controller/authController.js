let asyncErrorHandler=require("./../Utils/asyncErrorHandler");
let UserModel=require("./../Model/userModel");

exports.signup=asyncErrorHandler(async(req, res)=>{
    let createUser=await UserModel.create(req.body);

    res.status(200).json({
        status: "success",
        data:{
            createUser
        }
    })
});



/**
 * 
 * {
 * name: "Michael Oluwaseun Adebayo",
 * email: "tcodes317@gmail.com",
 * password: "jfkajkuripiueiuiqruieuriupavpavp",
 * confirmPassword: "jfkajkuripiueiuiqruieuriupavpavp"
 * }
 * 
 */