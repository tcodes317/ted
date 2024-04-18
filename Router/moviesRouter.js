const express=require("express");
const app=express();
const controller=require("./../controller/controller")

const router=express.Router();

router.route("/")
.get(controller.getAllMovies)
.post(controller.createMovies, controller.validate)

router.route("/:id")
.get(controller.getMovies)
.patch(controller.updateMovies, controller.validate)
.delete(controller.deleteMovies, controller.validate)

module.exports=router;