const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        unq_id: { type: String, required: true, unique: true },
        profilePicture: String, // Optional profile picture field
        location: {
            type: [{ type: Number }], // Array of numbers [longitude, latitude]
            index: "2dsphere", // Indexing the location for geospatial queries
            default: [] // Default to an empty array if no location is set
        },
        friends: [{ type: String }], // Array to store friends' unq_ids
        friend_req: [{ type: String }] // Array to store friend requests' unq_ids
    },
    { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' timestamps
);



const chatsDocumentsSchema = new mongoose.Schema(
    {
        ReceiverandSender_uniqueId    : String,
        chatdata : String

    }
);

const User = mongoose.model("individualUsers" , userSchema); 
const chatsDocuments = mongoose.model("chatsDocuments" , chatsDocumentsSchema);

module.exports = { User };