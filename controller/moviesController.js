

let Movies=require("./../Model/moviesSchema");
let  asyncErrorHandler=require("./../Utils/asyncErrorHandler");
let CustomError=require("./../Utils/CustomError");

exports.getHighestRate=asyncErrorHandler(async(req, res, next)=>{
    req.query.limit = "5";
    req.query.sort = "-ratings"

    next();
})

exports.getAllMovies=asyncErrorHandler(async(req, res, next)=>{
    let getAllMovies=await Movies.find(req.params.id);
    
    res.status(200).json({
        status: "success",
        count: Movies.length,
        data: {
            getAllMovies
        }
    })
})
exports.getMovies=asyncErrorHandler(async(req, res, next)=>{
    let getMovies=await Movies.findById(req.params.id);

    if(!getMovies){
        let err=new CustomError("Movies not found in the database", 400)
 
        return next(err);
    }

    res.status(200).json({
        status: "succes",
        count: Movies.length,
        data: {
            getMovies
        }
    })
})
exports.updateMovies=asycErrorHandler(async(req, res, next)=>{
    let updateMovies=await Movies.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!updateMovies){
        let err=new CustomError("Movies not updated", 400)

        return next(err);
    }

    res.status(200).json({
        status: "success",
        count: Movies.length,
        data: {
            updateMovies
        }
    })
});
exports.deleteMovies=asyncErrorHandler(async(req, res, next)=>{
    let deleteMovies=await Movies.findByIdAndDelete(req.params.id);

    if(!deleteMovies){
        let err=new CustomError("Movies not deleted from the database", 400)

        return next(err);
    }

    res.status(200).json({
        status: "success",
        count: Movies.length,
        data: {
            deleteMovies
        }
    })
})
exports.createMovies=asyncErrorHandler(async(req, res, next)=>{
    let createMovies=await Movies.create(req.body);

    if(!createMovies){
        let err=new CustomError("Movies not create in the database", 400);

        next(err)
    }

    res.status(200).json({
        status: "success",
        count: Movies.length,
        data: {
            createMovies
        }
    })
})
exports.getStat=asyncErrorHandler(async(req, res)=>{
    let Stat=await Movies.aggregate([
        {$match: {rating: {$gte: 4.5}}},
        {$group: {
            _id: null,
            avgRating: {$avg: "$rating"},
            avgPrice: {$avg: "$price"},
            minPrice: {$min: "$price"},
            maxPrice: {$max: "$price"},
            totalPrice: {$sum: "$price"},
            moviesCount: {$sum:  1}
        }}
    ]);
res.status(200).json({
    status: "success",
    count: Movies.length,
    data: Stat
})
})
exports.getMoviesByGenres=asyncErrorHandler(async(req, res)=>{
    let genres=req.params.id;

    let Movies=await Movies.aggregate([
        {$unwind: "$genres"},
        {$group: {
            _id: "$genres",
            moviesCount: {$sum: 1},
            movies: {$push: "$name"}
        }},
        {$addFields: {genres: "$_id"}},
        {$project: {_id: 0}},
        {$sort: {moviesCount: -1}},
        {$limit: 6},
        {$project: {_id: 0}}
    ]);
    res.status(200).json({
        status: "success",
        count: Movies.length,
        data: {
            Movies
        }
    })
})