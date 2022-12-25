const express = require('express');
const ProductModel = require('../models/product.model');

const products = express.Router();



products.get("/" ,async (req,res)=>{
    let {name} = req.query
    const data = await ProductModel.find({name:name})
    res.send({data:data})
})

products.get("/singleData" ,async (req,res)=>{
    let {id} = req.query
    const data = await ProductModel.findById(id)
    res.send({data:data})
})







module.exports = products