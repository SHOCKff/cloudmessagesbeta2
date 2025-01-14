const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../model/schema");
const shortid = require('shortid');

async function handle_signup_Userdata(req, res) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        // Create a new user with the hashed password
        const newUser = await User.create({
            userName: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Save the hashed password
            unq_id  : shortid.generate(),
            profilePicture: req.body.profilePicture, // Optional profile picture
            location: req.body.location || [] // Optional location field, defaults to empty array
        });

        return res.status(201).redirect('/login.html');
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error creating user:", err);
        return res.status(500).redirect('/signup.html');
    }
}


module.exports = handle_signup_Userdata;
