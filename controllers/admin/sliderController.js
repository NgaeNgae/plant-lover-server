const Slider = require('../../models/slider');
const base = require('../../services/base');
const imageService = require("../../services/ImageService");

const post = async (req,res) => {
    req.body["image"] = imageService.uploadImage(req.files.image);
    let result = await new Slider(req.body);
    await result.save();
    base.baseResponse(res,201,result,"Slider created");
}
const index = async (req,res) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 8;
    let startIndex = (page - 1) * limit;
        let result = await Slider.find({
            "$or": [
                { title: { $regex: req.query.search, $options: 'i' } },
            ]
        }).skip(startIndex).limit(limit).sort("order_by").sort({ createdAt: -1 });
        let data = { result, totalCount: (await Slider.find({
            "$or": [
                { title: { $regex: req.query.search, $options: 'i' } },
            ]
        })).length};
        base.baseResponse(res, 200, data, "Search products");    
    }

const show = async (req, res, next) => {
        let result = await Slider.findById(req.params._id);
        if (result) {
            base.baseResponse(res, 200, result, "detail Slider");
        } else {
            next(new Error("Slider not found"));
        }
    }
const destroy = async (req, res, next) => {
    let result = await Slider.findById(req.params._id);
    if (result) {
        imageService.dropImage(result.image);
        await Slider.deleteOne({ _id: req.params._id });
        base.baseResponse(res, 204, [], "Deleted Slider");
    } else {
        next(new Error("Slider not found"));
    }
}
const update = async (req,res, next) => {
    let result = await Slider.findById(req.params._id);
    if(result) {
        if(!req.body["image"]){
            imageService.dropImage(result.image);
            req.body["image"] = imageService.uploadImage(req.files.image);    
        }
        result =await Slider.findByIdAndUpdate(req.params._id,req.body)
        base.baseResponse(res, 200, result, "Updated the data");
    }else {
        next(new Error("Slider not found"));
    }
}

module.exports = { post, index, destroy,update,show }