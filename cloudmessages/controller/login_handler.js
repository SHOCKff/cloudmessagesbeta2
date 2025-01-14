const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing and comparisonconst shortid = require('shortid');
const path = require("path");
const { User } = require("../model/schema");

async function handle_login_Userdata(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).redirect('/login.html');
        }

        // Compare the hashed password with the plain text password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
           
        if (isPasswordValid) {console.log(user._id)
            return res.cookie("unq_id", user.unq_id,{ maxAge: 3600000}).status(200).redirect(`/?unq_id=${user.unq_id}`);;
        } else {  
            return res.status(400).redirect('/login.html');
        }


    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ message: "Error logging in" });
    }
}




module.exports = handle_login_Userdata;
