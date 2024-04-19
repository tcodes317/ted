

let fs=require("fs");
let Movies=require("./../Model/moviesSchema");
let mongoose=require("mongoose");
let dotenv=require("dotenv");

dotenv.config({path: "./../config.env"});


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then((conn)=>{
    console.log(conn)
}).catch((err)=>{
    console.log(err)
})

/////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\


let movies=require("./../data/data.json");

let 