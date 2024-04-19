const http = require("http");
const server = http.createServer();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data/data.json"));
const index = fs.readFileSync("./public/template/index.html", "utf-8");
const detProd=fs.readFileSync("./public/template/details.html", "utf-8");
const prodProd = fs.readFileSync("./public/template/product.html", "utf-8");
const replaceHtml = require("./module/replace.js");
const URL = require("url");


server.on("request", (req, res)=>{
    let {query, pathname: path} = URL.parse(req.url, true);

    if(path.toLocaleLowerCase() === "/" || path.toLocaleLowerCase() === "/home"){
        if(!query.id){
            let ot=data.map(prod => {
                return replaceHtml(prodProd, prod);
            })
            res.end(index.replace("{{CONTENT}}", ot.join(" ")));
        }
        res.end(index.replace("{{CONTENT}}", replaceHtml(detProd, data[query.id])))
    }
    else if(path.toLocaleLowerCase() === "/gallery"){
        res.end("Gallery Page")
    }
    else if(path.toLocaleLowerCase() === "/about"){
        res.end("About Page")
    }
    else if(path.toLocaleLowerCase() === "/contact"){
        res.end("contact page")
    }
    else{
        res.end("Page not found: Error 404")
    }
})

server.listen(4000, "127.0.0.1", () => {
    console.log("Connected!")
})