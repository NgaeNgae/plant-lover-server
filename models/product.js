const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    discount: { type: Number, default: 0, },
    description: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = Product = mongoose.model('products', ProductSchema);