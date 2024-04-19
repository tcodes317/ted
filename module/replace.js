module.exports=function(template, product){
    let output=template.replace("{{id}}", product.id);
    output=output.replace("{{name}}", product.name)
    output=output.replace("{{color}}", product.color);
    output=output.replace("{{ROM}}", product.ROM);
    output=output.replace("{{price}}", product.price);
    output=output.replace("{{modeName}}", product.modeName);
    output=output.replace("{{modelNumber}}", product.modelNumber);
    output=output.replace("{{size}}", product.size);
    output=output.replace("{{camera}}", product.camera);
    output=output.replace("{{Description}}", product.Description)
    output=output.replace("{{productImage}}", product.productImage);

    return output;
}