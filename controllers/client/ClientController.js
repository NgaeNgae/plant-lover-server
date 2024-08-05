const Slider = require('../../models/slider');
const base = require('../../services/base');
const Product = require('../../models/product');
const getSliders = async (req,res) => {
    const result =(await Slider.find().sort("order_by").sort({createdAt : -1})).filter(item => item.status === true);
    base.baseResponse(res,200,result,"get sliders");
}
const latestProductsForHomePage = async (req,res) => {
    const result = await Product.find().sort({createdAt : -1}).limit(4);
    base.baseResponse(res,200,result,"get Latest Products");
}
const bestSellingProductsForHomePage = async (req,res) => {
    const result = await Product.find().sort({count : 1}).limit(4);
    base.baseResponse(res,200,result,"get Latest Products");
}
const latestProducts = async (req,res) => {
    const result = await Product.find().sort({createdAt : -1});
    base.baseResponse(res,200,result,"get Latest Products");
}
const bestSellingProducts = async (req,res) => {
    const result = await Product.find().sort({count : 1});
    base.baseResponse(res,200,result,"get Latest Products");
}
const getProducts = async (req,res) => {
    const result =(await Product.find().sort({name : -1}));
    base.baseResponse(res,200,result,"get products");
}

const productDetail = async (req, res, next) => {
    let result = await Product.findById(req.params._id);
    if (result) {
        base.baseResponse(res, 200, result, "detail Product");
    } else {
        next(new Error("Product not found"));
    }
}

const searchProducts = async (req,res) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.query.value, $options: 'i' } },
        ]
    }).sort({ createdAt: -1 });
    base.baseResponse(res,200,result,"search products");
}

module.exports = {getSliders, latestProducts, getProducts,productDetail, bestSellingProducts,latestProductsForHomePage,bestSellingProductsForHomePage,searchProducts};