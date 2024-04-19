
let express=require("express");
let app=express();
let router=express.Router();
let authController=require("./../controller/authController");

router.route("/signup").post(authController.signup);