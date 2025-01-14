const express = require("express");
const { User } = require("../model/schema");


async function userdata_api(req ,res) {
  if (req.path == '/') {  //when user data from fetchfrom index.js
  const Unq_id = req.query.unq_id ;
  //user data
  const mongo_data = await User.findOne({"unq_id" : String(Unq_id)});
  //console.log(mongo_data);
  friends_unq_id  = mongo_data.friends ;  //friends array for further fetch
  //Users friends data
  friendsData = await User.find({ "unq_id": { $in: friends_unq_id } });
  //console.log(friendsData);
  return res.json({"User_data_updation": mongo_data,"Userfriends_data_updation": friendsData}) ;
  }

}

module.exports =  userdata_api;