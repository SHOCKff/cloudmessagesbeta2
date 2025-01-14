const express = require("express");
const { User } = require("../model/schema");



async function mockreq() {
const arrayItems = [
    'KSv_ThvWt', 'LurxONFwd', 'ouAJhf0cv', 'jFi1TZefB', 'RbZekaLRO', 'Lx2Jnr6VY', 
    'j7beEMej1', 'RYaN5-1Mh', 'OrQ6Xv86Z', 'DQgySSFvA', 'B9wST3Cpf', 'YVUStFTQu', 
    'NHyYHgt15', '2w9X5s2yP', 'bbvXDgPIE', 'LviCd9z7d', 'AN1sCvc8P', 'MLHIqxy_6', 
    'rtRkCyesY', '05Hxt_UAw', 'awuEOkagj', 'r4-o-vx4o'
  ];
  
  const userUnqId = 'KSv_ThvWt';  // The unq_id to update
  
  // Assuming the array should be added to a field called 'friend_req'
  const result = await User.findOneAndUpdate(
    { "unq_id": userUnqId },  // Find the document with this unq_id
    { $addToSet: { friend_req: { $each: arrayItems } } },  // Add all items from arrayItems to 'friend_req' field
    { new: true }  // Return the updated document
  );}
  //mockreq()

  






// function for send response to searched results 
async function searchFriends_api(req ,res) {
     already_friends_unq_idsArray = req.query.alreadyfriends.split(",") 
     results = await User.find({ userName : { $regex: req.query.searchedData ,  $options: "i" }}).select("userName unq_id profilePicture"); 
     results_Id = await User.findOne({ "unq_id" : req.query.searchedData });  //id
     if (results_Id) results.push(results_Id);//null if query by id not found
     filtered_results = results.filter(element => !already_friends_unq_idsArray.includes(element.unq_id));
    // console.log("SearchResults", filtered_results)
    return  res.json({"SearchResults": filtered_results}) ;
    }

//update friend's req array with users id i,e add friends
async function friendReq_api(req ,res) { 
    console.log(req.query)   
    const ackn = await User.findOneAndUpdate({ "unq_id" : req.query.unq_id_friend } ,{$addToSet : { friend_req : req.query.unq_id_user }} ,{ new: true } );
    return  res.json({"Added to friend's request array": ackn }) ;
}

//friend req people data
async function friendReq_data(req ,res) {  
    friend_reqs_data = await User.find({ "unq_id": { $in: req.query.unq_ids.split(',') } }).select("userName unq_id profilePicture");
    console.log("Fetched friendsReq's ",friend_reqs_data)
    return res.json({ "friend_reqs_data": friend_reqs_data }) ;    

}
  
//adding friends to friend list VICEVERSA and remove the accpted req from user friend_req array    
async function friend_add(req ,res) {
    const users_updatedfriendList = await User.findOneAndUpdate({ "unq_id": req.query.unq_id_user },{ $addToSet: { friends: req.query.unq_id_friend }},{ new: true })
    const friend_updatedfriendList = await User.findOneAndUpdate({ "unq_id": req.query.unq_id_friend },{ $addToSet: { friends: req.query.unq_id_user }},{ new: true })   
    const friends_after_add_updatedfriendList = await User.findOneAndUpdate({ "unq_id": req.query.unq_id_user },{ $pull: { friend_req : req.query.unq_id_friend }},{ new: true })
    console.log(friends_after_add_updatedfriendList);
    return res.json({ friends_after_add_updatedfriendList });
}

// remove req from friend_req array
async function friend_reject(req ,res) {
    Updatedfriend_req_List = await User.findOneAndUpdate({ "unq_id": req.query.unq_id_user },{ $pull: { friend_req : req.query.unq_id_friend }},{ new: true })
    console.log(Updatedfriend_req_List)
    return res.json({Updatedfriend_req_List }) ; 
}



module.exports =  { searchFriends_api , friendReq_api , friendReq_data , friend_add , friend_reject};