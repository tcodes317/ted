

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
            let 
        }
    }
    pagination(){

    }
}

module.exports=ApiFeature