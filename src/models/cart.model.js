const mongoose = require("mongoose")

const cartProductSchema = new mongoose.Schema({
    qty:{type:Number,default:1},
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "user"}

})

const cartProduct = mongoose.model("cart" , cartProductSchema)
module.exports = cartProduct