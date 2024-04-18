const express=require("express");
const app=express();
const moviesRouter=require("./router/moviesRouter")

app.use("/api/vi/movies", moviesRouter);
app.use(express.json());
app.use(express.static("./public"));

app.listen(4000, "127.0.0.1", ()=>{
    console.log("Connected!")
});