async function searchFriends() {
    const searchQuery = document.getElementById('searchBar').value;
    if (!searchQuery) {
        alert("Please enter a name to search.");
        return;
    }

    //search
    await fetch(`/search?searchedData=${searchQuery}&alreadyfriends=${JSON.parse(localStorage.getItem("sharedData")).User_data_updation.friends + ","+ JSON.parse(localStorage.getItem("sharedData")).User_data_updation.unq_id }`).then(res => res.json()).then(data => {
    //already firends = already friends + user self , to avoid display self name
        displayResults(data.SearchResults);
    });
}

async function displayResults(results) {
    const resultsContainer = document.getElementById('friendSearchResults');
    resultsContainer.innerHTML = '';
    if (!results.length) {
        resultsContainer.innerHTML = '<p>No friends found.</p>';
       
    }

    results.forEach(user => {
        if(!user) return;
        console.log("serach data",user)
        profilePicture = user.profilePicture || "images/default.jpg"; //hardcode for now
       // console.log("profile pic : ",profilePicture)
        const resultElement = document.createElement('div');
        resultElement.classList.add('friendSearchResultItem');
        resultElement.innerHTML = `
            <div class="userImage">
                <img src=${profilePicture} alt="img" class="resultImage">
            </div>
            <div class="userInfo">
                <p><strong>${user.userName}</strong></p>
                <button onclick="sendFriendRequest('${user.unq_id}')">Add Friend</button>
            </div>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

async function sendFriendRequest(unq_id_friend) {
    await fetch(`/friends_req?unq_id_friend=${unq_id_friend}&unq_id_user=${ JSON.parse(localStorage.getItem("sharedData")).User_data_updation.unq_id }`, {method: 'POST'})
    return alert("Friend Request Sent !");

}



