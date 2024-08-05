const mongoose = require('mongoose');

const SliderSchema = mongoose.Schema({
    order_by : { type : Number, required : true },
    image : { type : String, required : true },
    status : { type : Boolean, default : true },
    title : { type : String, required : true },
    description : { type : String, required : true },
    deleted: { type: Boolean, default: false }
},{ timestamps : true });

module.exports = Slider = mongoose.model('sliders', SliderSchema);