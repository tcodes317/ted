let server=require("./app.js")
let mongoose=require("mongoose");
let dotenv=require("dotenv");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then((conn)=>{
    console.log(conn)
}).catch(err => {
    console.log(err)
})

dotenv.config({path: "./config.env"});

process.on("uncaughtException", (err)=>{
    console.log(err.name, err.message);
    console.log("uncaughtException occured! shutting down")

    process.exit(1)
})

process.on("unhandledRejection", (err)=>{
    console.log(err.name, err.message);
    console.log("unhandledRejection Occured! shutting down");

    server.close(()=>{
        process.exit(1)
    })
})

console.log(process.env)

server.listen(4000, "127.0.0.1")