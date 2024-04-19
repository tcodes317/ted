

let fs=require("fs");
let Movies=require("./../Model/moviesSchema");
let mongoose=require("mongoose");
let dotenv=require("dotenv");
let asyncErrorHandler=require("./../Utils/asyncErrorHandler");

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

let importMovies=asyncErrorHandler(async(req, res)=>{
        let imMovies=await Movies.create(movies);
        
        res.status(200).json({
            status: "success",
            data:{
                imMovies
            }
        })
    })

let deleteMovies=asyncErrorHandler(async(req, res)=>{
    let deleteMovies=await Movies.deleteMany({});

    res.status(200).json({
        status: "success",
        data:{
            deleteMovies
        }
    })
})

console.log(process.arvg);

if(process.env.arvg[2] === "--import"){
    importMovies()
}
if(process.env.arvg[2] === "--delete"){
    deleteMovies();
}