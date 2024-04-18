const fs=require("fs");
const movies=JSON.parse(fs.readFileSync("./../data/data.json"));

exports.getAllMovies=(req, res)=>{
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies
        }
    })
}
exports.getMovies=(req, res)=>{
    let id=req.params.id;
    let findMovies=movies.find(el => el.id === id);
    let index=movies.indexOf(findMovies);

    res.status(200).json({
        status: "success",
        count: movies.length,
        data: findMovies
    })
}
exports.updateMovies=(req, res)=>{
    let id=req.params.id;
    let findMoviesAndUpdate=movies.find(el => el.id === id);
    let index=movies.indexOf(findMovies);

    movies[index] = findMoviesAndUpdate;

    fs.writeFile("./data/movies.json", JSON.stringify(findMoviesAndUpdate), (err, data)=>{
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: {
                findMoviesAndUpdate
            }
        })
    })
}
exports.deleteMovies=(req, res)=>{
    let id=req.params.id;
    let findMoviesAndDelete=movies.find(el => el.id === id);
    const index=movies.indexOf(findMoviesAndDelete);

    movies.splice(index, 1);

    fs.writeFile("./data/movies.json", JSON.stringify(movies), (err, data)=>{
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: null
        })
    })
}
exports.createMovies=(req, res)=>{
    let id=req.params.id;
    let newId=movies[movies.length - 1].id + 1;
    let newMovies=Object.assign({newId: newId}, req.body);

    fs.writeFile("./data/movies.json", JSON.stringify(newMovies), (err, data)=>{
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: {
                newMovies
            }
        })
    })
}
exports.validate=(req, res)=>{
    if(!req.body.name || !req.body.id || !req.body.color){
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: "Movies not validated"
        })
    }
}