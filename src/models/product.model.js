const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    img:{type:String},
    title:{type:String},
    rate:{type:Number},
    strikedPrice:{type:Number},
    qty:{type:Number},
    name:{type:String},
    discount:{type:String},
    review:{type:Number}
})
const ProductModel = mongoose.model('product',ProductSchema);
module.exports  = ProductModel;