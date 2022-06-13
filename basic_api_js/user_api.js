const apiUrl = "https://in-food.herokuapp.com/";
const pageSize = 2;

function OnLoad(){
    document.forms["searchUser"].word.value = sessionStorage.getItem("searchUser");
}

function searchUserOnInput(){
    var word = document.forms["searchUser"].elements.word.value;
    sessionStorage.setItem("searchUser", word);
}


function formSearchUser(){
    var formValue = document.forms["searchUser"];
    var word = formValue.elements.word.value;
    $("#userTable").find('tbody').html("");
    document.getElementById("searchUserBtn").disabled = true;

    searchUserApi(word).then(userList=>{
        
        if (userList.length == 0){
            var row = $('<tr><td>無資料</td></tr>') 
            $("#userTable").find('tbody').append(row);
            document.getElementById("searchUserBtn").disabled = false;
        }
        else{
            userList.forEach(user => {
                getUserProfileByIdApi(user.userId).then(profile=>{
                    document.getElementById("searchUserBtn").disabled = true;
                    getUserByFirebaseIdApi(profile.firebaseId).then(detail=>{
                    var row = $('<tr><td>' + user.displayName + '</td><td>' + user.username  + '</td><td><pre><code>' + JSON.stringify(profile, null, '  ') + '</code></pre></td><td><pre><code>' + JSON.stringify(detail, null, '  ') + '</code></pre></td></tr>') 
                    $("#userTable").find('tbody').append(row);
                    $('#userTable').trigger('footable_initialize');
                    document.getElementById("searchUserBtn").disabled = false;
                    });
                });
            });  

        }
    })

    
}

function getMyProfileByIdApi(id){
    return $.ajax({
        url: apiUrl + "api/v1/user/my/" + id,
        context: document.body,
        method: "GET",
    });
}

function getUserProfileByIdApi(id){
    return $.ajax({
        url: apiUrl + "api/v1/user",
        context: document.body,
        method: "GET",
        data:{
            "myId": "20900092-bc18-400b-aa26-f1eba5c52d20", // temp add: fix id
            "userId": id
        }
    });
}

function getUserByFirebaseIdApi(id){
    return $.ajax({
        url: apiUrl + "api/v1/user/firebaseId/" + id,
        context: document.body,
        method: "GET",
    });
}

async function searchUserApi(word){
    var userList = [];
    for(var i=0; i<pageSize; i++){
        await $.ajax({
            url: apiUrl + "api/v1/user/search",
            context: document.body,
            method: "GET",
            data:{
                "name": word,
                "myId": "20900092-bc18-400b-aa26-f1eba5c52d20", // temp add: fix id
                "page": i,
                "size": pageSize
                }
        }).then(res=>{
            if(res.userVOList){
                userList = userList.concat(res.userVOList);
            }
        });
    }
    return userList;
}
