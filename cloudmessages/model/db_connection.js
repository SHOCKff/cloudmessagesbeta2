const express = require("express");
const mongoose = require("mongoose");

const mongo_url = "mongodb+srv://cloudmessages:A9a9e2DFX338Pfzo@cluster96.1phps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster96";



const connectMongo = mongoose.connect(mongo_url).then(()=>{console.log("Mongodb connected sucessfully!")}).catch((err)=>{console.log("Mongodb error Msg : ",err)});

module.exports = connectMongo;