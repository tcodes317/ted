
//AUTHENTICATION AND AUTHORIZATION >> USERMODEL

let mongoose=require("mongoose");
let validators=require("validator")

let userModel=new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required. Please enter a name"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "name should container alpha component"],
        minlength: [4, "Character should not be less than 4"],
        maxlength: [400, "Character should not be more than 400"]
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true
    },
    // photo: String,
    password:{
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },
    confirmPassword:{
        type: String,
        required: [true, "confirmPassword is required"]
    }
});

const Model=mongoose.Model("UserSignup", userModel);

module.exports=Model;