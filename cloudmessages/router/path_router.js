const express = require("express");
const router = express.Router();
const path = require("path");
const userdata_api = require("./userdata_api"); 
const {searchFriends_api , friendReq_api , friendReq_data ,friend_add , friend_reject} = require("./searchFriends_api");
const ristrict_login = require("../auth");
const  handle_signup_Userdata  = require("../controller/Signup_handler");
const  handle_login_Userdata   = require("../controller/login_handler");



//By default landing page
router.get("/" , ristrict_login , (req, res) => {
    res.sendFile(path.resolve("./src/home.html"));
});

// middleware controls
router.get("/signup", (req, res) => {
    res.sendFile(path.resolve("./src/signup.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("./src/login.html"));
});


// data storing AND retreving
router.post("/signup", (req, res) => {
   handle_signup_Userdata(req,res);
});

router.post("/login", (req, res) => {
    handle_login_Userdata(req,res);
 });
 

 //user data curd operations
 router.use("/user", (req, res) => {
    userdata_api(req,res);
 });


//search users 
router.get("/search", (req, res) => {
    searchFriends_api(req,res);
 });

 //add req at friendreq array
 router.post("/friends_req", (req, res) => {
    friendReq_api(req,res);
 });


 router.get("/friends_req", (req, res) => {
   friendReq_data(req,res);
 });

 router.patch("/friends_req_add", (req, res) => {
    friend_add(req,res);
  });

router.patch("/friends_req_rej", (req, res) => {
   friend_reject(req,res);
 });


module.exports = router;