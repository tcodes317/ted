

class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    fliter(){
        let queryStr=JSON.stringify(req.query);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let queryObj=JSON.parse(queryStr);
    }
    sort(){
        if(req.query.sort){
            let sortBy=req.query.sort.split(",").join(" ");
            query=query.sort(sortBy);
        }
        else{
            query=query.sort("-createdBy")
        }
    }
    limitFields(){
        if(req.query.fields){
            let fields=req.query.fields.split(",").join(" ");
            query=query.select(fields);
        }
        else{
            query=query.select("-__v");
        }
    }
    pagination(){
        let page=req.query.page * 1 || 1;
        let limit = req.query.limit * 1 || 10;
        let skip=skip(page - 1).limit(limit);

        if(req.query.page){
            query=query.skip(skip) * limit(limit);
        }
        else{
            
        }
    }
}

module.exports=ApiFeature