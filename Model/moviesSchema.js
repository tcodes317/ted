

let  mongoose=require("mongoose");
let fs=require("fs");

let moviesSchema=new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "Id is required"],
        unique: true,
        trim: true
    },
    name:{
        type: String,
        required: [true, "name is required"],
        unique: true,
        trim: true,
        maxlength: [400, "Character should not be more than 400"],
        minlength: [4, "Character should not be less than 4"],
        validators: [validate.isAlpha, "Name should contain alpha component"]
    },
    color:{
        type: String,
        required: [true, "color is requird"],
    },
    ROM:{
         type: Number,
         required: [true, "ROM is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    modeName:{
        type: String,
        required: [true, "modeName is required"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "modeName should contain alpha component"]
    },
    modelNumber:{
        type: String,
        required: [true, "modelNumber is required"]
    },
    size:{
        type: String,
        required: [true, "size is required"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "size should contain alpha component"]
    },
    camera:{
        type: String,
        required: [true, "camera is required"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "camera should contain alpha component"]
    },
    Description:{
        type: String,
        required: [true, "Description is required"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "Description should contain alpha component"]
    },
    productImage:{
        type: String,
        required: [true, "productImage is required"],
        unique: true,
        trim: true,
        validators: [validate.isAlpha, "productImage should contain alpha component"]
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

moviesSchema.virtual("durationInHours")
.get(function(next){
    this.duration / 60

    next();
})

moviesSchema.pre("save", function(next)=>{
    this.createdBy="Michael Adebayo";

    next();
})

moviesSchema.post("save", function(doc, next)=>{
    let content=`Document with a name ${doc.name}, created by ${doc.createdBy} has been uploaded to the server`;

    fs.writeFile("./Log/log.txt", content, {flag: "a"}, (err)=>{
        console.log(err);
    })

    next();
});

moviesSchema.pre(/^find/, function(next){
    this.find({releasedDate: Date.now()});
    this.startTime=Date.now();

    next();
});
moviesSchema.post(/^find/, function(doc, next)=>{
    this.find({releasedDate: Date.now()});
    this.endTime = Date.now();

    let content=`Query has been uploaded in the database within ${this.startTime - this.endTime}`;

    fs.writeFile("./Log/log.txt", content, {flag: "a"}, (err)=>{
        console.log(err);
    });

    next();
})

let moviesModel=mongoose.model("Model", moviesSchema);

module.exports=moviesModel;