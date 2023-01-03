const express = require("express");

const cartProduct = require("../models/cart.model")


const cart = express.Router();


cart.get("/", async(req,res)=>{
    const user = req.headers
    console.log(user.id,"user")
    try {
        let data = await cartProduct.find({userId:user.id}).populate("userId").populate("productId")
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


cart.delete("/:id", async(req,res)=>{
    const {id} = req.headers
    try {
        await cartProduct.findByIdAndDelete(id);
        res.send("Deleted")
    } catch (error) {
        console.log(error)
    }

})


module.exports = cart