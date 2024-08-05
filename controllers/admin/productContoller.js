const Product = require("../../models/product");
const base = require("../../services/base");
const imageService = require("../../services/ImageService");
const index = async (req, res) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 8;
    let startIndex = (page - 1) * limit;
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.query.search, $options: 'i' } },
            ]
        }).skip(startIndex).limit(limit).sort({ createdAt: -1 });
        let data = { result, totalCount: (await Product.find({
            "$or": [
                { name: { $regex: req.query.search, $options: 'i' } },
            ]
        })).length};
        base.baseResponse(res, 200, data, "Search Products");
}
const store = async (req, res) => {
    req.body["images"] = imageService.uploadImage(req.files.images);
    let result = await new Product(req.body);
    result.save();
    base.baseResponse(res, 201, req.body, "Created the data");
}
const show = async (req, res, next) => {
    let result = await Product.findById(req.params._id);
    if (result) {
        base.baseResponse(res, 200, result, "detail Product");
    } else {
        next(new Error("Product not found"));
    }
}
const destroy = async (req, res, next) => {
    let result = await Product.findById(req.params._id);
    if (result) {
        imageService.dropImage(result.images);
        await Product.deleteOne({ _id: req.params._id });
        base.baseResponse(res, 204, [], "Deleted Product");
    } else {
        next(new Error("Product not found"));
    }
}
const update = async (req,res, next) => {
    let result = await Product.findById(req.params._id);
    if(result) {
        if(!req.body["images"]){
            imageService.dropImage(result.images);
            req.body["images"] = imageService.uploadImage(req.files.images);    
        }
        result =await Product.findByIdAndUpdate(req.params._id,req.body)
        base.baseResponse(res, 200, result, "Updated the data");    
    }else {
        next(new Error("Product not found"));
    }
}

module.exports = { index, store, show, destroy, update }