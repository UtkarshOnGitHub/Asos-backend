const express = require("express");

const cartProduct = require("../models/cart.model")


const cart = express.Router();


cart.get("/", async(req,res)=>{
    try {
        let data = await cartProduct.find({}).populate("userId").populate("productId")
        res.send(data)
    } catch (error) {
        console.log(error)
    }

})


cart.post("/", async(req,res)=>{
    const {productId,userId} = req.body;
    try {
        let data = new cartProduct({productId,userId})
        await data.save()
        res.status(200).send("Item Added To Cart")  
    } catch (error) {
        console.log(error)
    }

})


module.exports = cart