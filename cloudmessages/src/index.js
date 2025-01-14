const navbar_in_index = document.getElementById("nav_in_js"); 
localStorage.clear();


async function fetch_user_data() {  //send request with the id in cookies and get user response
  const cok = document.cookie;
  await fetch(`/user?${cok}`).then(res => res.json()).then(data => {
     update_navbar(data.User_data_updation);
     update_friends(data.Userfriends_data_updation);
     update_friendReq_received(data.User_data_updation.friend_req);
     localStorage.setItem("sharedData", JSON.stringify(data));
     console.log("local storage",JSON.parse(localStorage.getItem("sharedData")))
    })
    
}


update_navbar=(data)=>{
 document.getElementById("user_name").innerText = `${data.userName}`; //username updation

}


//let first search bar off
document.getElementById("addfriends_in_js").style.display = "none" 
let bool = true ;
//only dom manuplation
async function add_friends(){
  if (bool) {document.getElementById("chats_in_js").style.display = "none"; document.getElementById("addfriends_in_js").style.display = "block";   document.getElementById("add_friends").innerText = "❌"; }
  else {document.getElementById("chats_in_js").style.display = "block"; document.getElementById("addfriends_in_js").style.display = "none" ;   document.getElementById("add_friends").innerText = "➕"; document.getElementById("container").style.display = "none"; location.reload(false)}
  return bool=!bool;

};
   

async function update_friends(data){
  for (let i =0 ; i < data.length ; i++) {
  //console.log(data[i]); //mongo data from index 0
    const friendobj = document.getElementById(`friend${i+1}`);
    friendobj.style.visibility = "visible";
    friendobj.children[1].innerText = data[i].userName;
  }
  
};

// Call Update_navbar function to update the username dynamically
fetch_user_data();




// handling friend requests
// DOM manuplation for friend reqs BELL symbol
document.getElementById("notifi_bell_index").onclick=()=>{
  document.getElementById("chats_in_js").style.display = "none";
  document.getElementById("addfriends_in_js").style.display = "none"; 
  document.getElementById("add_friends").innerText = "❌"; 
  document.getElementById("container").style.display = "block";
  return  bool=false;
}

// Function to render friend requests
function renderFriendRequests(friendRequests) {
  //if(!friendRequests) return;
  const requestsContainer = document.getElementById('friendRequestsList');
  requestsContainer.innerHTML = ''; // Clear previous requests
  friendRequests.forEach((request) => {
      const requestElement = document.createElement('div');
      requestElement.classList.add('friend-request');
      request.image = "images/default.jpg"; //hardcode for now
      requestElement.innerHTML = `
          <img src="${request.image}" alt="img">
          <div class="info">
              <p><strong>${request.userName}</strong></p>
          </div>
          <div>
              <button onclick="acceptRequest('${request.unq_id}')">Accept</button>
              <button id="reject-button" onclick="rejectRequest('${request.unq_id}')">Reject</button>
          </div>
      `;
      requestsContainer.appendChild(requestElement);
  });
}

async function update_friendReq_received(data){  //received 
  console.log("friend reqs",data)
  await fetch(`/friends_req?unq_ids=${data}`).then(res => res.json()).then(data => {
    console.log(data);
    renderFriendRequests(data.friend_reqs_data);}
)}


// Function to accept a friend request
async function acceptRequest(unq_id_friend) {
  await fetch(`/friends_req_add?unq_id_friend=${unq_id_friend}&unq_id_user=${JSON.parse(localStorage.getItem("sharedData")).User_data_updation.unq_id}`, {method: 'PATCH',})
  .then(res => res.json()).then(data => update_friendReq_received(data.friends_after_add_updatedfriendList.friend_req)) 
}

// Function to reject a friend request
async function rejectRequest(unq_id_friend) {
  await fetch(`/friends_req_rej?unq_id_friend=${unq_id_friend}&unq_id_user=${JSON.parse(localStorage.getItem("sharedData")).User_data_updation.unq_id}`, {method: 'PATCH'})
  .then(res => res.json()).then(data => update_friendReq_received(data.Updatedfriend_req_List.friend_req))
}



document.getElementById("container").style.display = "none";









