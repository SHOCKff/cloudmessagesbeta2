const express = require("express");
const path = require("path");
const router = require("./router/path_router");


const ristrict_login = (req,res,next) =>{
    if ( Object.keys(req.cookies).length === 0 ) {
        return res.status(400).redirect("./login.html");
    };
   console.log("login checking and header cookies check");  //future jwt verification
   next();

};

module.exports = ristrict_login;